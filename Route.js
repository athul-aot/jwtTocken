const express=require('express');
const route=express.Router();
const {userRegGet, userRegPost,userExistCheck,userLoginPost,taskAddPost,verifyTocken}=require('./functions')

//usermanagement
route.get('/',userRegGet)
route.post('/register',userExistCheck,userRegPost)
route.post('/login',userLoginPost)

//task management
route.post('/task',verifyTocken,taskAddPost)

module.exports=route;