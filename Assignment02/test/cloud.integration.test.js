const supertest = require('supertest');
const app = require('../index');
const request=require('supertest');
const {userData, updateUserData}=require('./userData')

const dotenv = require('dotenv');
dotenv.config()

//healthz
describe('healthz endpoint test', () => {

    it('healthz-connection success', (done) => {
        request(app).get("/healthz")
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

});

// create user
describe("create user", () => {
    it("create user successful", (done) => {
        request(app)
            .post("/v1/user")
            .send(userData)
            .expect(201)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }

                done();
            });
    });
});

// get the user
describe('get user endpoint test', () => {

    it('get user success', (done) => {
        request(app).get("/v1/user/self")
            // .set('Authorization', 'Basic ' + Buffer.from('username:password').toString('base64'))
            .auth(userData.username,userData.password)
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

});

//update user
describe('update user endpoint test', () => {

    it('put user success', (done) => {
        request(app).put("/v1/user/self")
            // .set('Authorization', 'Basic ' + Buffer.from('username:password').toString('base64'))
            .auth(userData.username,userData.password)
            .send(updateUserData)
            .expect(204)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

});

//get user
describe('get user endpoint test', () => {

    it('get user success', (done) => {
        request(app).get("/v1/user/self")
            .auth(userData.username,updateUserData.password)
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

});