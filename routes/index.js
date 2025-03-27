const routes = require('express').Router();
const school = require('./school');

routes.use('/', require('./swagger'));

routes.use('/school', school);
routes.use(
  '/',
  (docData = (req, res) => {
    let docData = {
      documentationURL: './api-docs',
    };
    res.send(docData);
  })
);

module.exports = routes;