'use strict';

var Trip    = require('../models/trip'),
    mp      = require('multiparty'),
    moment  = require('moment');

exports.new = function(req, res){
  res.render('trips/new');
  console.log('EXPORTS NEW', req.parame);
};

exports.create = function(req, res){
  var form = new mp.Form();
  form.parse(req, function(err, fields, files){
    Trip.create(fields, files, function(){
  //Trip.create(req.body, function(){
      console.log('FORM', fields, files);
      res.redirect('/trips');
      console.log('AFTER REDIRECT', fields, files);
      console.log('TRIP', Trip);
    });
  });
};

exports.index = function(req, res){
  Trip.all(function(err, trips){
    res.render('trips/index', {trips:trips, moment:moment});
  });
};

exports.show = function(req, res){
  Trip.findById(req.params.id, function(trip){
    res.render('trips/show', {trip:trip});
  });
};

