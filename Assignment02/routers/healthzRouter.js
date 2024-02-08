const express=require('express');
const healthzController=require('../controllers/healthzController.js');

const router=express.Router();

router.all("/",healthzController.healthCheckRequest);

module.exports=router;