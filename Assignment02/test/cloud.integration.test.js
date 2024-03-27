const request = require('supertest')(app);
const { userData, updateUserData } = require('./userData');

const dotenv = require('dotenv');
dotenv.config();

// Healthz
describe('healthz endpoint test', () => {
    it('healthz-connection success', (done) => {
        request.get("/healthz")
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});

// Create user
describe("create user", () => {
    it("create user successful", (done) => {
        request
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

// Get user
describe('get user endpoint test', () => {
    it('get user success', (done) => {
        request.get("/v1/user/self")
            .auth(userData.username, userData.password)
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});

// Update user
describe('update user endpoint test', () => {
    it('put user success', (done) => {
        request.put("/v1/user/self")
            .auth(userData.username, userData.password)
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

// Get user again
describe('get user endpoint test', () => {
    it('get user success', (done) => {
        request.get("/v1/user/self")
            .auth(userData.username, updateUserData.password) // Update password here if needed
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});
