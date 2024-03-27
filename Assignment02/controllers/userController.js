const { createUser, getUserInfo, updateUser, verifyUser} = require("../services/userServices");
const {authenticateUser} = require("../helpers/basicAuthHelper");

const logger = require('../logs')

async function createUserController(request, response) {
    if(Object.keys(request.query).length){
        logger.warn(`Invalid request with params`);
        response.status(400).json({msg:"invalid request with params"});
    }else{
        try {
            const result=await createUser(request, response);
            response.status(result.code).json(result.msg);
        } catch (error) {
            console.log(error);
            if(error.name==="SequelizeValidationError"){
                logger.error(`invalid firstname, lastname or username`);
                response.status(400).json({msg:"invalid firstname, lastname or username"})
            }else{
                logger.error(`unable to create to user`);
                response.status(400).json({msg:"unable to create user"});
            }
        }
    }

}

async function getUserInfoController(request,response){
    if(Object.keys(request.query).length || request.headers["content-type"]){
        logger.warn(`Invalid request with params or body`);
        response.status(400).json({msg:"invalid request with params or body"});
    }else {
        try {
            // console.log(request.headers["content-type"].length);
            // console.log(request.headers["content-type"]);

            // if(request.headers["content-type"]){
            //     return response.status(400).json({msg:"get should not have body"});
            // }
            // console.log("this is controller");
            const authUser = await authenticateUser(request, response);
            // console.log(authUser)
            // console.log("controller user"+authUser);
            if (authUser) {
                logger.debug(`Found user: ${authUser.username}`);
                response.status(200).json(
                    {
                        "id": authUser.id,
                        "firstName": authUser.firstName,
                        "lastName": authUser.lastName,
                        "username": authUser.username,
                        "accountCreated": authUser.accountCreated,
                        "accountUpdated": authUser.accountUpdated

                    });
            } else {
                logger.error(`unauthorized`);
                response.status(401).json({msg: "unauthorized"});
            }

        } catch (error) {
            logger.error(`cannot get user from get`);
            response.status(404).json({msg: "cannot get user from get"});
            console.log(error);
        }
    }
}

async function putUserInfoController(request,response){
    if(Object.keys(request.query).length){
        logger.warn(`Invalid request with params`);
        response.status(400).json({msg:"invalid request with params"});
    }else{
        try{
            const authUser=await authenticateUser(request,response);
            if(authUser){
                const result=await updateUser(request,authUser);
                response.status(result.code).json(result.msg);
            }else{
                logger.error(`unauthorized`);
                response.status(401).json({msg:"unauthorized"});
            }
        }catch(error){
            if(error.name==="SequelizeValidationError"){
                logger.error(`invalid firstname, lastname`);
                response.status(400).json({msg:"invalid firstname, lastname"})
            }else{
                logger.error(`unable to create user`);
                response.status(400).json({msg:"unable to create user"});
            }

        }
    }

}

async function verifyUserController(request, response) {
    try{
        console.log("this is time")
        console.log(request.query)
        result=await verifyUser(request,response);
        console.log(result);
        response.status(result.code).json(result.msg);
    }catch(error){
        console.log("this is error block")
        response.status(400).json({msg:"unauthorized"});
    }
  }

async function invalidMethod(request,response){
    logger.error(`invalid method`);
    response.status(405).send();
}



module.exports = {
    createUserController,
    getUserInfoController,
    putUserInfoController,
    invalidMethod,
    verifyUserController
};
