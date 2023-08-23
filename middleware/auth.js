const jwt=require('jsonwebtoken');
const User=require('../MODELS/userSchema')

// we are defining middleware for checking whether user is valid or not
const auth=async (req,res,next)=>{
    try {
        const token=req.header('Authorization').replace('Bearer ',''); // bearer is just to show that it is a token
        const decoded= jwt.verify(token,process.env.JWT_SECRET_TOKEN) // extracting the ID of the given token

        const existingUser=await User.findOne({
            _id:decoded._id
        })

        if(!existingUser)
        {
            throw new Error('Invalid User');
        }

        req.user=existingUser; // adding user to request field
        req.token=token; // adding token to request field
        next();

    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
}

module.exports=auth