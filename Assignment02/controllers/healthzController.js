const {Sequelize} = require('sequelize');
const logger = require('../logs')

// app.use(bodyParser.text({ type: ['text/plain', 'text/html', 'application/javascript', 'application/json', 'application/xml'] }));


const sequelize=new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,

    {
        dialect:'mysql',
        host: process.env.DB_HOST,
        timezone:'-05:00',
    }
);


const healthCheckRequest=async(request,response)=>{
    response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    response.setHeader("Pragma", "no-cache");
    response.setHeader("X-Content-Type-Options", "nosniff");

    if(request.method!=="GET"){
        logger.warn(`Method ${request.method} not allowed`);
        response.status(405).json();
    }else{
        if(Object.keys(request.query).length || Object.keys(request.body).length){
            logger.error(`invalid request, contains body`);
            response.status(400).json();
            return;
        }
        try{
            await sequelize.authenticate();
            console.log("database connection successful");
            logger.debug(`connection is healthy`);
            response.status(200).json();
        }catch(error){
            console.log("database connection failed");
            logger.error(`database connection failed`);
            response.status(503).json();
        }
    }
};

module.exports={
    healthCheckRequest,
    sequelize
};