import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';
import { app } from '../app';
import Car from '../models/car';

const should = chai.use(chaiHttp).should();

describe('Cars', () => {

  beforeEach(done => {
    Car.remove({}, err => {
      done();
    });
  });

  describe('Backend tests for cars', () => {

    it('should get all the cars', done => {
      chai.request(app)
        .get('/api/cars')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get cars count', done => {
      chai.request(app)
        .get('/api/cars/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('should create new car', done => {
      const car = new Car({ name: 'Fluffy', weight: 4, age: 2 });
      chai.request(app)
        .post('/api/car')
        .send(car)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('name');
          res.body.should.have.a.property('weight');
          res.body.should.have.a.property('age');
          done();
        });
    });

    it('should get a car by its id', done => {
      const car = new Car({ name: 'Car', weight: 2, age: 4 });
      car.save((error, newCar) => {
        chai.request(app)
          .get(`/api/car/${newCar.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('weight');
            res.body.should.have.property('age');
            res.body.should.have.property('_id').eql(newCar.id);
            done();
          });
      });
    });

    it('should update a car by its id', done => {
      const car = new Car({ name: 'Car', weight: 2, age: 4 });
      car.save((error, newCar) => {
        chai.request(app)
          .put(`/api/car/${newCar.id}`)
          .send({ weight: 5 })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should delete a car by its id', done => {
      const car = new Car({ name: 'Car', weight: 2, age: 4 });
      car.save((error, newCar) => {
        chai.request(app)
          .delete(`/api/car/${newCar.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

});


