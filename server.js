const express=require("express");
const db = require("./db.config");
const { TodoTable } = require("./schema");
const { eq } = require("drizzle-orm");
const app=express();

require('dotenv').config();

const port=process.env.PORT || 3000 


app.get("/",async(req,res)=>{

    // 1. Insertion DOne 
    // const item=({
    //     title:"Moring walk",
    //     desc:"Today i will definitly go for moring walk.This is my duety"
    // })
    // const todos=await db.insert(TodoTable).values(item).returning()

    // 2. Get data 
    const todos=await db.select({
        title:TodoTable.title,
        desc:TodoTable.desc
    }).from(TodoTable).where(eq(TodoTable.id,1))
    return res.send({
        message:
        todos
    })
})

app.listen(port,()=>{
    console.log("Server is running on port "+ port);
})