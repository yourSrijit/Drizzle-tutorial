const express=require("express");
const db = require("./db.config");
const { TodoTable } = require("./schema");
const app=express();

require('dotenv').config();

const port=process.env.PORT || 3000 


app.get("/",async(req,res)=>{

    const item=({
        title:"Moring walk",
        desc:"Today i will definitly go for moring walk.This is my duety"
    })
    const todos=await db.insert(TodoTable).values(item).returning()
    return res.send({
        message:
        todos
    })
})

app.listen(port,()=>{
    console.log("Server is running on port "+ port);
})