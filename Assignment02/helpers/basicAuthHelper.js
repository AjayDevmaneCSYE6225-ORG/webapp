const User = require("../models/User");
const {getUserInfo} = require("../services/userServices");
const bcrypt=require("bcrypt");

async function authenticateUser(request,response){
    // console.log("this is inside auth user");
    try{
        const authorization=request.headers.authorization;
        if(!authorization){
            return response.status(403).json({msg:"forbidden"});
        }
        const encoded=authorization.substring(6);
        const decoded=Buffer.from(encoded,"base64").toString("ascii");
        const [retrievedUsername,retrievedPassword]=decoded.split(":");

        const user=await getUserInfo(retrievedUsername);
        // console.log(user);
        console.log(user)
        console.log(user.isVerified)

        if(!user){
            // console.log("!user");
            console.log("this is first if block")
            return null;
        }else if(!user.isVerified){
            console.log("this is second if")
            return user.isVerified;
        }else if(!(await bcrypt.compare(retrievedPassword,user.password))){
            // console.log(await bcrypt.compare(retrievedPassword,user.password));
            // console.log("!password");
            return null;
        }else{
            // console.log("elseuser")
            return user;
        }
    }catch(error){
        console.log("this is inside error of authenticateuser")
        throw error;
    }


}

module.exports={
    authenticateUser
}