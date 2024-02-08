const { createUser, getUserInfo, updateUser,} = require("../services/userServices");
const {authenticateUser} = require("../helpers/basicAuthHelper");

async function createUserController(request, response) {
    if(Object.keys(request.query).length){
        response.status(400).json({msg:"invalid request with params"});
    }else{
        try {
            const result=await createUser(request, response);
            response.status(result.code).json(result.msg);
        } catch (error) {
            console.log(error);
            if(error.name==="SequelizeValidationError"){
                response.status(400).json({msg:"invalid firstname, lastname or username"})
            }else{
                response.status(400).json({msg:"unable to create user"});
            }
        }
    }

}

async function getUserInfoController(request,response){
    if(Object.keys(request.query).length || request.headers["content-type"]){
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
                response.status(401).json({msg: "unauthorized"});
            }

        } catch (error) {
            response.status(404).json({msg: "cannot get user from get"});
            console.log(error);
        }
    }
}

async function putUserInfoController(request,response){
    if(Object.keys(request.query).length){
        response.status(400).json({msg:"invalid request with params"});
    }else{
        try{
            // console.log("this is put controller");
            const authUser=await authenticateUser(request,response);
            if(authUser){
                const result=await updateUser(request,authUser);
                response.status(result.code).json(result.msg);
            }else{
                response.status(401).json({msg:"unauthorized"});
            }
        }catch(error){
            if(error.name==="SequelizeValidationError"){
                response.status(400).json({msg:"invalid firstname, lastname"})
            }else{
                response.status(400).json({msg:"unable to create user"});
            }

        }
    }

}

async function invalidMethod(request,response){
    response.status(405).send();
}



module.exports = {
    createUserController,
    getUserInfoController,
    putUserInfoController,
    invalidMethod
};
