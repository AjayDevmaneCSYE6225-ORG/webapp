// post user
// get self
// put self

const express=require('express');

const {createUserController, getUserInfoController, putUserInfoController, invalidMethod, verifyUserController}=require('../controllers/userController')
const {authenticateUser} = require("../helpers/basicAuthHelper");

const router=express.Router();

// handle /user creation
router.post("/",createUserController);

router.get("/self",getUserInfoController)

router.put("/self",putUserInfoController)

router.get("/verifyUser", verifyUserController)

router.all("/", invalidMethod)

router.all("/self", invalidMethod)

module.exports=router;