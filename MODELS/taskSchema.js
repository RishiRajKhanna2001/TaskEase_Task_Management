const mongoose=require('mongoose');

const TaskSchema=new mongoose.Schema({
    description:{
      type:String,
      required:true
    },
    completed:{
      type:Boolean,
      default:false
    },
    owner:{
      type:mongoose.Schema.Types.ObjectId, // it's just syntax which shows the type of "ID"
      required:true,
      ref:'User' // it is defined in order to specify that the above info is comming from userSchema 
    }
  },{
      timestamps: true
  });

module.exports= mongoose.model('Task',TaskSchema)



