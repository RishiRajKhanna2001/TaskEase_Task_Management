const mongoose=require('mongoose')
require('dotenv').config()

const MONGO_URL=process.env.MONGO_URL

mongoose.connect(MONGO_URL,{
 dbName:process.env.myDB
})
.then(()=>{
    console.log('connected to database')
})
.catch((err)=>{
 console.log("Error connecting with database- ",err)
})


