const Coach = require('../models/Coach')
const UnhandledError = require('../utils/UnhandledError');

function index(req, res) {  
  res.json({
    data: []
  });
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

module.exports = {
  index: index,
  create: create,
  show: show
}