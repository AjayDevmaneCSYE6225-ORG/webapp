const bcrypt=require("bcrypt");

const saltRounds=10;

async function encryptPassword(password) {
    try{
        return await bcrypt.hash(password, saltRounds);
    }catch(error){
        throw error;
    }
}
module.exports={
    encryptPassword
}