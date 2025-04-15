const routes = require('express').Router();
const school = require('./school');
const auth = require('./auth');

routes.use('/', require('./swagger'));

routes.use('/school', school);
routes.use('/auth', auth);
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