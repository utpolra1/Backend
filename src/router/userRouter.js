const express = require('express');
const { userController } = require('../controller/userController');
const userRoute = express.Router();

//POST User API
userRoute.post('/userCreate',userController);

module.exports=userRoute;
