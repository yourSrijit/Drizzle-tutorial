const {defineConfig} =require("drizzle-kit")

require('dotenv').config();
module.exports =defineConfig({
    dialect: 'postgresql',
    out:"./migration",
    schema: "./schema.js",
   dbCredentials:{
    url:process.env.DB_URL
   }
  })