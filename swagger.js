import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Blog API',
    description: 'CSE 341 Project 2 - Express, Mongoose, Express-Validator'
  },

  host: 'localhost:3000', //'cse341-contacts-ky1j.onrender.com',
  schemes: ['http']
};

const output = './swagger.json';
const routes = ['./src/routes/*.*.js'];

swaggerAutogen()(output, routes, doc);
