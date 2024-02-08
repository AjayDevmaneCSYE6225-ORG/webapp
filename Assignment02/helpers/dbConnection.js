const {sequelize} = require("../controllers/healthzController");

async function testConnection(request,response) {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database');
        response.status(503).json();
    }
}

module.exports = testConnection;
