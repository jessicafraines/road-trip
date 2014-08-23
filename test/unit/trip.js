/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Trip      = require('../../app/models/trip'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'trips';

describe('Trip', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Trip object', function(){
      var o = {name:'summer trip', cash:'500', start:'nashville',slat:'36.17',slng:'-86.78',
            startdate:'08-12-2104', end:'green bay', elat:'44.52', elng:'-88.20',
          enddate:'08-27-2014', mpg:'50', gascost:'9.50'},
          t = new Trip(o);
      expect(t).to.be.instanceof(Trip);
      expect(t.name).to.equal('summer trip');
      expect(t.cash).to.equal(500);
      expect(t.start).to.equal('nashville');
      expect(t.slat).to.equal(36.17);
      expect(t.slng).to.equal(-86.78);
      expect(t.startdate).to.be.instanceof(Date);
      expect(t.end).to.equal('green bay');
      expect(t.elat).to.equal(44.52);
      expect(t.elng).to.equal(-88.20);
      expect(t.enddate).to.be.instanceof(Date);
      expect(t.mpg).to.equal(50);
      expect(t.gascost).to.equal(9.50);

    });
  });

  describe('.all', function(){
    it('should get all trips', function(done){
      Trip.all(function(err, trips){
        expect(trips).to.have.length(2);
        done();
      });
    });
  });
  describe('.create', function(){
    it('should create a new trip', function(done){
      var o = {name:'summer trip', cash:'500', start:'nashville',slat:'36.17',slng:'-86.78',
            startdate:'08-12-2104', end:'green bay', elat:'44.52', elng:'-88.20',
          enddate:'08-27-2014', mpg:'50', gascost:'9.50'};
      Trip.create(o, function(err, trip){
        expect(trip._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

});//ending brackets

