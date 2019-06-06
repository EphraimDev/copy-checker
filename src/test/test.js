import { describe, it } from 'mocha';
import chai,{expect} from 'chai';
import chaiHttp from 'chai-http';
import data from './data/data';

import app from '../app';
import {connect, close} from '../model/db';
import { User } from '../model/User';

chai.should();

chai.use(chaiHttp);

let userId = '';
let token = '';

//console.log(resetUser);
describe('Tests for My Auth Endpoints', () => {
    before((done) => {
        try {

             connect();
            User.collection.drop()
            done()
        } catch (err) {
            done(err)
        }
        

    })

    after( (done) => {
        try {
            close();
            done()
        } catch (err) {
            done(err)
        }
        

    })

  describe('Handles valid endpoints', () => {
    describe('POST /api/v1/auth/create', () => {
      it('should create a new user',  (done) => {
        chai.request(app)
          .post('/api/v1/auth/create')
          .send(data.create)
          .then((res) => {
              const body = res.body;
              expect(body).to.contain.property('message');
              expect(body).to.contain.property('user');
              expect(body).to.contain.property('token');
              done()
          })
      });
    });

    describe('POST /api/v1/auth/login', () => {
      it('should login in an existing user', (done) => {
        chai.request(app)
          .post('/api/v1/auth/login')
          .send(data.login)
          .then((res) => {
            const body = res.body;
            userId = body.findUser._id;
            token = body.token;
            expect(body).to.contain.property('message');
            expect(body).to.contain.property('token');
            done()
        })
      });
    });

    describe('POST /api/v1/auth/user/:userId', () => {
        it('should return the profile details of a user', (done) => {
          chai.request(app)
            .get(`/api/v1/auth/user/${userId}`)
            .then((res) => {
              const status = res.status;
              expect(status).to.equal(200);
              done()
          })
        });
      });

      // describe('POST /api/v1/compare/compare-submission', () => {
      //   it('should return the comparison result', (done) => {
      //     const filePath = `C:/Users/user/Desktop/Eph/HNG/lecturer/src/test/data/Ephraim Aigbefo.docx`;
      //     chai.request(app)
      //       .post(`/api/v1/compare/compare-submission`)
      //       .set('authorization', token)
      //       .field('Content-Type', 'multipart/form-data')
      //       .field('firstStudent', 'Jane')
      //       .field('secondtStudent', 'John')
      //       .field('firstStudentID', 1111)
      //       .field('secondtStudentID', 2222)
      //       .field('first', filePath)
      //       .attach('second', 'src/test/data/Ephraim Aigbefo.docx')
      //       .then((res) => {
      //         const status = res.status;
      //         console.log(res.body.first)
      //         //expect(status).to.equal(200);
      //         expect(res.body.firstStudent).to.equal("Jane")
      //         done()
      //     })
      //   });
      // });

  });

  describe('Handles invalid endpoints', () => {
      describe('POST /api/v1/auth/create', () => {
        it('should return an error message for user that exists already', (done) => {
          chai.request(app)
            .post('/api/v1/auth/create')
            .send(data.create)
            .end((err, res) => {
              res.should.have.status(409);
              done();
            });
        });
      });

      describe('POST /api/v1/auth/login', () => {
        it('should an error message for incorrect password', (done) => {
          chai.request(app)
            .post('/api/v1/auth/login')
            .send(data.incorrectPassword)
            .end((err, res) => {
              res.should.have.status(409);
              done();
            });
        });
      });

      describe('POST /api/v1/auth/login', () => {
        it('should an error message for user that does not exist', (done) => {
          chai.request(app)
            .post('/api/v1/auth/login')
            .send(data.noUser)
            .end((err, res) => {
              res.should.have.status(404);
              done();
            });
        });
      });

      describe('GET /api/v1/auth/user/:userId', () => {
        it('should return error message for wrong user id', (done) => {
          chai.request(app)
            .get(`/api/v1/auth/user/5cf157f05e852d32f0f4cd09`)
            .then((res) => {
              const status = res.status;
              expect(status).to.equal(404);
              done()
          })
        });
      });

      describe('POST /api/v1/compare/compare-submission', () => {
        it('should an error message for incomplete student data', (done) => {
          chai.request(app)
            .post('/api/v1/compare/compare-submission')
            .set('authorization', token)
            .send()
            .then((res) => {
              const status = res.status;
              expect(status).to.equal(400);
              done()
          })
        });
      });
  });
});