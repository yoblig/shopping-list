var chai = require('chai');
var chaiHttp = require('chai-http');

global.environment = 'test';
var server = require('../server.js');
var Item = require('../models/item');
var seed = require('../db/seed');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Shopping List', function() {
    before(function(done) {
        seed.run(function() {
            done();
        });
    });
    
     it('should list items on GET', function (done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                // res.body[0].should.have.property('id');
                // res.body[0].should.have.property('name');
                // res.body[0].id.should.be.a('number');
                // res.body[0].name.should.be.a('string');
                done();
            });
    });
    it('should add an item on POST', function(done) {
        chai.request(app)
            .post('/items')
            .send({'name': 'Mustang'})
            .end(function(err,res){
                should.equal(err,null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.name.should.be.a('string');
                // res.body.id.should.be.a('number');
                // res.body.name.should.equal('Mustang');
                // storage.items.should.be.a('array');
                // storage.items.should.have.length(4);
                // storage.items[3].should.be.a('object');
                // storage.items[3].should.have.property('id');
                // storage.items[3].should.have.property('name');
                // storage.items[3].id.should.be.a('number');
                // storage.items[3].name.should.be.a('string');
                // storage.items[3].name.should.equal('Mustang');
                done();
            });
    });
    // it('should edit an item on PUT', function (done) {
    //     chai.request(app)
    //         .put('/items/1')
    //         .send({'name':'Ferrari'})
    //         .end(function(err, res) {
    //           should.equal(err,null);
    //             //res.should.have.status(201);
    //             //res.should.be.json;
    //           //res.body.should.be.a('object');
    //           //res.body.should.have.property('name');
    //           //res.body.name.should.equal('Ferrari');
    //             //storage.items[1].name.should.be.a('string');
    //             //storage.items[1].name.should.equal('Ferrari');
    //           done();     
    //         });
    // });
    it('should delete an item on DELETE', function(done) {
        chai.request(app)
            .delete('/items/1')
            .end(function (err, res) {
            //   should.equal(err,null);
            //   res.should.have.status(201);
                //storage.items[1].name.should.equal('Chevelle');
                // storage.items.should.have.length(2);
               done();
            });
    });

    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});