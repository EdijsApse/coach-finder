require('dotenv').config();

const mongoose = require('mongoose');

const User = require('../models/User');
const Coach = require('../models/Coach');

const testUserEmail = 'test@example.com';

mongoose.connect(process.env.DB_URL)
.then(() => {
	seedApp();
})
.catch(err => {
	console.log('Connection to DB not established!')
	console.log(err);
})

async function seedApp() {
  let user = await User.findOne({ email: testUserEmail });

  if (!user) {
    user = await User.create({ email: testUserEmail, name: 'Test', surname: 'Test', password: testUserEmail });
  }

  const coaches = await Coach.insertMany([
    {
      jobtitle: 'Developer',
      fields: ['FE DEV', 'BE DEV', 'Full Stack Dev'],
      price: 2.99,
      location: 'Latvia',
      about: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      user: {
        name: user.name,
        surname: user.surname,
        id: user._id
      }
    },
    {
      jobtitle: 'Driver instructor',
      fields: ['A Category', 'B Category'],
      price: 3.99,
      location: 'Latvia',
      about: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      user: {
        name: user.name,
        surname: user.surname,
        id: user._id
      }
    },
    {
      jobtitle: 'Fitness instructor',
      fields: ['Healthier lifestyle', 'Fitness'],
      price: 1.50,
      location: 'Latvia',
      about: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      user: {
        name: user.name,
        surname: user.surname,
        id: user._id
      }
    },
    {
      jobtitle: 'Mental health coach',
      fields: ['Mental welness'],
      price: 2,
      location: 'Latvia',
      about: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      user: {
        name: user.name,
        surname: user.surname,
        id: user._id
      }
    },
    {
      jobtitle: 'Developer',
      fields: ['FE DEV', 'BE DEV', 'Full Stack Dev'],
      price: 2.99,
      location: 'Latvia',
      about: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      user: {
        name: user.name,
        surname: user.surname,
        id: user._id
      }
    },
    {
      jobtitle: 'Driver instructor',
      fields: ['A Category', 'B Category'],
      price: 3.99,
      location: 'Latvia',
      about: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      user: {
        name: user.name,
        surname: user.surname,
        id: user._id
      }
    },
    {
      jobtitle: 'Fitness instructor',
      fields: ['Healthier lifestyle', 'Fitness'],
      price: 1.50,
      location: 'Latvia',
      about: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      user: {
        name: user.name,
        surname: user.surname,
        id: user._id
      }
    },
    {
      jobtitle: 'Mental health coach',
      fields: ['Mental welness'],
      price: 2,
      location: 'Latvia',
      about: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      user: {
        name: user.name,
        surname: user.surname,
        id: user._id
      }
    },
    {
      jobtitle: 'Developer',
      fields: ['FE DEV', 'BE DEV', 'Full Stack Dev'],
      price: 2.99,
      location: 'Latvia',
      about: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      user: {
        name: user.name,
        surname: user.surname,
        id: user._id
      }
    },
    {
      jobtitle: 'Driver instructor',
      fields: ['A Category', 'B Category'],
      price: 3.99,
      location: 'Latvia',
      about: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      user: {
        name: user.name,
        surname: user.surname,
        id: user._id
      }
    },
    {
      jobtitle: 'Fitness instructor',
      fields: ['Healthier lifestyle', 'Fitness'],
      price: 1.50,
      location: 'Latvia',
      about: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      user: {
        name: user.name,
        surname: user.surname,
        id: user._id
      }
    },
    {
      jobtitle: 'Mental health coach',
      fields: ['Mental welness'],
      price: 2,
      location: 'Latvia',
      about: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      user: {
        name: user.name,
        surname: user.surname,
        id: user._id
      }
    },
    {
      jobtitle: 'Developer',
      fields: ['FE DEV', 'BE DEV', 'Full Stack Dev'],
      price: 2.99,
      location: 'Latvia',
      about: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      user: {
        name: user.name,
        surname: user.surname,
        id: user._id
      }
    },
    {
      jobtitle: 'Driver instructor',
      fields: ['A Category', 'B Category'],
      price: 3.99,
      location: 'Latvia',
      about: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      user: {
        name: user.name,
        surname: user.surname,
        id: user._id
      }
    },
    {
      jobtitle: 'Fitness instructor',
      fields: ['Healthier lifestyle', 'Fitness'],
      price: 1.50,
      location: 'Latvia',
      about: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      user: {
        name: user.name,
        surname: user.surname,
        id: user._id
      }
    },
    {
      jobtitle: 'Mental health coach',
      fields: ['Mental welness'],
      price: 2,
      location: 'Latvia',
      about: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      user: {
        name: user.name,
        surname: user.surname,
        id: user._id
      }
    },
  ]);

  console.log('Inserted User:');
  console.log(user);
  console.log('Inserted Coaches:');
  console.log(coaches);
}