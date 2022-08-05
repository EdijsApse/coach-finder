const CoachDataProvider = require('../dataproviders/CoachesDataProvider');
const UnhandledError = require('../utils/UnhandledError');
const Coach = require('../models/Coach');
const Message = require('../models/Message');

async function index(req, res) {
  const coachesDataProvider = new CoachDataProvider(req.query, { pageSize: 10, currentPage: req.query.page });

  await coachesDataProvider.search();

  res.json(coachesDataProvider.getApiData());
}

async function create(req, res, next) {
  const { jobtitle, price, fields, location, about } = req.body;
  
  const coach = {
    jobtitle: jobtitle,
    price: price,
    fields: fields,
    location: location,
    about: about,
    user: {
      name: req.user.name,
      surname: req.user.surname,
      id: req.user.id
    }
  };
  try {
    const createdCoach = await Coach.create(coach);
    
    res.status(201).json({
      success: true,
      message: 'Coach created!',
      coach: createdCoach
    });

  } catch (err) {
    next(new UnhandledError('Coach not created!', err));
  }
}

async function show(req, res, next) {
  try {
    const coach = await Coach.findById(req.params.id);
      if (coach) {
        res.json({
          success: true,
          coach: coach.getApiData()
        })
      } else {
        res.json({
          success: false,
          message: 'Coach not found by given ID'
        })
      }
  } catch(err) {
    next(new UnhandledError('Couldnt find coach by this id!', err));
  }
}

async function sendMessage(req, res, next) {
  try {
    const coach = await Coach.findById(req.params.id);
    if (!coach) {
      return res.json({
        success: false,
        message: 'Coach not found by given ID'
      });
    }

    if (coach.belongToUser(req.user.id)) {
      return res.json({
        success: false,
        message: 'You cannot send message to yourself!'
      });
    }

    const message = {
      message: req.body.message,
      from: {
        name: req.user.name,
        surname: req.user.surname,
        id: req.user.id
      },
      to: {
        name: coach.user.name,
        surname: coach.user.surname,
        id: coach.user.id,
      }
    }

    await Message.create(message);

    res.json({
      success: true,
      message: 'Message sent! Coach received notification about new message.'
    })

    
  } catch(err) {
    next(new UnhandledError('Couldnt find coach by this id!', err));
  }
}

module.exports = {
  index: index,
  create: create,
  show: show,
  sendMessage: sendMessage
}