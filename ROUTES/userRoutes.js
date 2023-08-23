const express = require('express');
const User=require('../MODELS/userSchema')
const router = express.Router();
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

router.get('/',(req,res)=>{
  res.status(400).json("userRoutes working");
})

router.post('/register',async (req,res)=>{
  try {
    const {name,email,password} = req.body;
    const newUser=new User({name,email,password}) 
    await newUser.save()
    res.status(200).json({
      newUser,
      message:"newUser saved successfully"
    })
  } catch (error) {
    res.status(500).json({
      message:"error with register route"
    })
  }
})

router.post('/login',async (req,res)=>{
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(!user){
        throw new Error('Unable to login , invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password); // (orginal password,entered password)

    if(!isMatch){
        throw new Error('Unable to login , invalid credentials');
    }

    const token = jwt.sign({
        _id: user._id.toString()
    }, process.env.JWT_SECRET_TOKEN );

    res.send({ user, token , message: "Logged in successfully"});
   }
    catch (err) {
        res.status(400).send({ error: err });
    }
})

// register and login user routes
module.exports=router;
 