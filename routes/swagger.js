const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

// Swagger UI options
const options = {
    swaggerOptions: {
      oauth: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        realm: "",
        appName: "SchoolTab",
        redirectUrl: "./",
        scopeSeparator: " ",
        scopes: "email profile",
        useBasicAuthenticationWithAccessCodeGrant: true,
        usePkceWithAuthorizationCodeGrant: true,
        additionalQueryStringParams: {
            prompt: 'consent', // Forces consent screen
            access_type: 'offline' // Gets refresh token
          }
      }
    }
  };
  

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument,options));

module.exports = router;