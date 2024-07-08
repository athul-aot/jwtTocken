const express=require('express');
const router=express.Router();
const { userRegPost } = require('../Helpers/userManagement');
const { userExistCheck } = require('../Middlewares/userExistanceValidate');
const { userLoginPost,userLoginGet,verifyTocken,generateToken} = require('../Middlewares/loginValidate');
const { taskAddPost } = require('../Helpers/taskManagement');


//usermanagement
router.post('/register',userExistCheck,userRegPost)
router.post('/login',userLoginPost)
router.get('/login',verifyTocken,userLoginGet)

//task management
router.post('/task',verifyTocken,taskAddPost)

module.exports=router;