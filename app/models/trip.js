'use strict';


var Mongo = require('mongodb'),
    _     = require('lodash'),
    fs    = require('fs'),
    path  = require('path');

function Trip(o){
  console.log('1111', o);
  this.name       = o.name[0];
  this.cash       = parseFloat(o.cash[0]);
  this.start      = o.start[0];
  this.slat       = parseFloat(o.slat[0]);
  this.slng       = parseFloat(o.slng[0]);
  this.startdate  = new Date(o.startdate[0]);
  this.end        = o.end[0];
  this.elat       = parseFloat(o.elat[0]);
  this.elng       = parseFloat(o.elng[0]);
  this.enddate    = new Date(o.enddate[0]);
  this.mpg        = parseFloat(o.mpg[0]);
  this.gascost    = parseFloat(o.gascost[0]);
  this.photos     = [];
  console.log('TEST', o);
}

Object.defineProperty(Trip, 'collection', {
  get: function(){return global.mongodb.collection('trips');}
});

Trip.all = function(cb){
  Trip.collection.find().toArray(cb);
};

/*Trip.create = function(o, cb){
  var t = new Trip(o);
  Trip.collection.save(t, cb);
};*/

Trip.create = function(fields, files, cb){
  console.log('222', fields, files);
  var t = new Trip(fields);
  t.moveFiles(files);
  Trip.collection.save(t, cb);
  console.log('333', t);
  return(t);
};

Trip.prototype.moveFiles = function(files){
  var baseDir = __dirname + '/../static',
      relDir  = '/img/' + this._id,
      absDir  = baseDir + relDir;

  fs.mkdirSync(absDir);

  this.photos = files.photos.map(function(photo, index){
    if(!photo.size){return;}

    var ext      = path.extname(photo.path),
        name     = index + ext,
        absPath  = absDir + '/' + name,
        relPath  = relDir + '/' + name;

    fs.renameSync(photo.path, absPath);
    return relPath;
  });

  this.photos = _.compact(this.photos);
};

Trip.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Trip.collection.findOne({_id:_id}, function(err, object){
    var trip = changePrototype(object);
    cb(trip);
  });
};

Trip.prototype.save = function(cb){
  Trip.collection.save(this, cb);
};
module.exports = Trip;

function changePrototype(object){
  return _.create(Trip.prototype, object);
}
