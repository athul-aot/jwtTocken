const express=require('express');
const app=express();
const route=require('./Route');
app.use(express.json());

app.use('/',route)



app.listen(3000,()=>{
    console.log("Sevrer started at port 3000");
})