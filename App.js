const express=require('express');
const router = require('./Routes/router');
const app=express();

app.use(express.json());

app.use(router)


app.listen(3000,()=>{
    console.log("Sevrer started at port 3000");
})