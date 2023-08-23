const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const UserSchema=new mongoose.Schema({
    name:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true,
      unique:true
    },
    password:{
      type:String,
      required:true
    }
  },{
      timestamps: true
  });

// UserSchema.pre() means -> before saving any changes in the  schema do the below operation of hashing the password
// below function act as a middleware
UserSchema.pre('save',async function(next) {
    const user=this; // don't use this inside arrow function

    if(user.isModified('password'))
    {
      user.password=await bcrypt.hash(user.password,8);
    }

    next();
})


module.exports=new mongoose.model('User',UserSchema)

