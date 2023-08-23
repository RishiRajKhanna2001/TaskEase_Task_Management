const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT=8000

const userRoutes=require('./ROUTES/UserRoutes')
const taskRoutes=require('./ROUTES/taskRoutes')

require('./db')
require('dotenv').config();

app.use(bodyParser.json())
app.use(cors())
app.use('/user',userRoutes)
app.use('/task',taskRoutes)

app.get('/',(req,res)=>{
    res.status(200).json({message:"success"})
})

app.listen(PORT,()=>{
    console.log("connected to server");
})

