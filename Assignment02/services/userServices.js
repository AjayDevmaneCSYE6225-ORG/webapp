const User = require("../models/User");
const {encryptPassword} = require("../helpers/bcryptPassword");
const logger = require("../logs");

function validPassword(password){
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    return passwordRegex.test(password);
}

// console.log(process.env.NODE_ENV);

const { PubSub } = require('@google-cloud/pubsub');

// let pubSubClient;

// if(process.env.NODE_ENV != "test" ){

const pubSubClient = new PubSub({ projectId: 'csye6225-414121' });

// }

async function createUser(request, response) {
    try {

        const allowedAttributes=['firstName', 'lastName', 'password', 'username'];
        const invalidFields = Object.keys(request.body).filter(field => !allowedAttributes.includes(field));

        console.log(invalidFields);

        if (invalidFields.length > 0) {
            logger.error(`invalid field updation`);
            return {code:400,msg:{msg:"invalid field updation"}};
        }

        const existingUser=await User.findOne({where:{username:request.body.username}});
        if(existingUser){
            logger.error(`user exists : ${request.body.username}`);
            return {code:400,msg:{msg:"user exists"}}
        }

        if(!(validPassword(request.body.password))){
            logger.error(`invalid password`);
            return {code:400,msg:{msg:"invalid password"}};
        }

        request.body.password=await encryptPassword(request.body.password);

        const currDateTime=new Date();
        const createdBody=await User.create({
            firstName:request.body.firstName,
            lastName: request.body.lastName,
            password: request.body.password,
            username: request.body.username,
            accountCreated: currDateTime,
            accountUpdated: currDateTime,
        });

        console.log(createdBody.dataValues.firstName);

        const displayedBody={
            id:createdBody.dataValues.id,
            firstName:createdBody.dataValues.firstName,
            lastName: createdBody.dataValues.lastName,
            username: createdBody.dataValues.username,
            accountCreated: createdBody.dataValues.accountCreated,
            accountUpdated: createdBody.dataValues.accountUpdated
        }

        // console.log(createdBody);
        // publishing to pub/sub
        const topicName = 'verify_email';
        const message = {
            id: createdBody.dataValues.id,
            username:createdBody.dataValues.username,
        };

        const dataBuffer = Buffer.from(JSON.stringify(message));

        // if(process.env.NODE_ENV != "test" ){

        await pubSubClient.topic(topicName).publishMessage({data:dataBuffer});
        console.log("pubsub message sent")

        // }

        console.log("user created!");
        logger.info(`user created : ${displayedBody.username}`);
        // await publishMessage({
        //     email: displayedBody.username,
        // });
        return {code:201,msg:displayedBody};
    } catch (error) {
        throw error;
    }
}

async function getUserInfo(toBeFetchedUsername){
    // console.log("inside getuserinfo");
    // console.log(await User.findOne({where:{username:toBeFetchedUsername}}));
    return await User.findOne({where: {username: toBeFetchedUsername}});
}

async function updateUser(request,user){
    const allowedAttributes=['firstName', 'lastName', 'password'];
    const invalidFields = Object.keys(request.body).filter(field => !allowedAttributes.includes(field));
    console.log(invalidFields);
    if (invalidFields.length > 0) {
        logger.error(`invalid field updation`);
        return {code:400,msg:{msg:"invalid field updation"}};
    }

    try{
        const userInfo=await User.findOne({where:{username:user.username}});
        // console.log(userInfo.username);
        console.log(Object.keys(request.body).length);
        if(!(validPassword(request.body.password)) || Object.keys(request.body).length===0){
            logger.error(`invalid updations`);
            return {code:400,msg:{msg:"invalid updations"}};
        }
        // validPassword(request.body.password);
        const currDateTime=new Date();
        await userInfo.update({
            firstName:request.body.firstName,
            lastName: request.body.lastName,
            password: await encryptPassword(request.body.password),
            username: user.username,
            accountUpdated: currDateTime
        });
        await userInfo.save();
        console.log("user updated!");
        logger.info(`updated user : ${user.username}`);
        return {code:204, msg:""};
    }catch(error){
        throw error;
    }
}

async function verifyUser(token) {
    try{
        console.log("123")
        console.log(token+"this is inside the verify user function")

        const user = await User.findOne({ where: { id:token } });
        console.log(user);
      
        if (!user) {
            return false;
        }
      
        const currentTime = new Date();
        const sentTime = new Date(user.linkSentTime);

        const diff = (currentTime.getTime() - sentTime.getTime()) / (1000 * 60);
      
        if (diff > 2) {
            return false;
        }

        user.linkClickTime=currentTime;
        user.isVerfied=true;

        await user.save();

        return true;
     
    }catch(error){
        console.log(error);
        throw error;
    }
  }

module.exports = {
    createUser,
    getUserInfo,
    updateUser,
    verifyUser
};
