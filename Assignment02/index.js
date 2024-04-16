// library exports
const express=require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const expressWinston = require('express-winston')
const { transports, format } = require('winston')

const logger = require('./logs')

// file exports
const healthzRequest=require('./routers/healthzRouter')
const db=require('./models/User');
const userRouter=require('./routers/userRouter')
const {sequelize} = require("./controllers/healthzController");
const testConnection = require("./helpers/dbConnection");

const app=express();
const PORT=process.env.PORT;

app.use(expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true
}))

// library use
app.use(bodyParser.json());
app.use(bodyParser.text({ type: ['text/plain', 'text/html', 'application/javascript', 'application/json', 'application/xml'] }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.raw({ limit: '1024mb', type: () => true }));
const schema="csye6225";

app.use(async (request, response, next) => {
    try {
        await sequelize.authenticate();
        // console.log("successful");
        // logger.info(`hitting database connection`);
        // db.sequelize.sync({force:false}).then(request => {s
        //     console.log("table created!")
        // });
        // await sequelize.createSchema(schema);
        // await sequelize.sync({ alter: true })
        next();
    } catch (error) {
        console.log("database connection failed");
        logger.error(`Database connection failed`);
        response.status(503).json({ message: "Database connection failed" });
    }
});


// syncing db
console.log("before");
try{
    db.sequelize.sync({force:false}).then(request => {
        console.log("table created!")
    });
}catch(error){
    logger.error(`database not connected`);
    console.log("database not connected");
}

// routers
app.use("/healthz",healthzRequest);
app.use("/v2/user",userRouter);

// handling other endpoints
app.use(function(request,response){
    logger.error(`invalid url`);
    response.status(404).json({msg:"invalid url"});
});

module.exports=app;

// listening port
app.listen(PORT,()=> {
    console.log(`Server is running at http://${process.env.DB_HOST}:${PORT}`);
    logger.debug('application is running')
});

