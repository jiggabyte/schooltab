const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'SchoolTab API',
    description: 'The School Tab API with Authentication'
  },
  host: process.env.HOST,
  schemes: ['http', 'https'],
  securityDefinitions: {
    googleOAuth: {
      type: "oauth2",
      description: "Google OAuth 2.0 authentication",
      flow: "accessCode",
      authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth",
      tokenUrl: "https://oauth2.googleapis.com/token",
      scopes: {
        email: "View your email address",
        profile: "View your basic profile info"
      }
    }
  },
  security: [{
    googleOAuth: [
      "email",
      "profile"
    ]
  }]
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);