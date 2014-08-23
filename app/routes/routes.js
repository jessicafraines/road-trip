'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    less           = require('less-middleware'),
    trips          = require('../controllers/trips'),
    home           = require('../controllers/home');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(less(__dirname + '/../static'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());

  app.get('/', home.index);
  app.get('/about', home.about);
  app.get('/faq', home.faq);
  app.get('/contact', home.contact);

  app.get('/trips/new', trips.new);
  app.post('/trips/new', trips.create);
  app.get('/trips', trips.index);
  app.get('/trips/:id', trips.show);
  app.get('trips/:id/stops', trips.stops);

  console.log('Express: Routes Loaded');
};

