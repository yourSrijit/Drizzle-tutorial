const express=require("express")
const app=express();

require('dotenv').config();

const port=process.env.PORT || 3000 


app.get("/",(req,res)=>{
    return res.send("Hi Srijit")
})

app.listen(port,()=>{
    console.log("Server is running on port "+ port);
})