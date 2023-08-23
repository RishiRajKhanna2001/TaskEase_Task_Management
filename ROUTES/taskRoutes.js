const express = require('express');
const router = express.Router();

const auth=require('../middleware/auth')
const Task=require('../MODELS/taskSchema')

//every time we will be performing any task , we will be first authorizing the user

router.get('/test',auth,(req,res)=>{
  res.status(200).json({message:"taskRoutes working",
  user:req.user // Since req will contain the ID after getting passed through middleware
  });
})

router.post('/createTask',auth,async (req,res)=>{
 try {
   const task=new Task({
    ...req.body, // description,completed from req.body
    owner:req.user._id // stored bcz. of passing from middleware
   })

   await task.save();
   res.status(200).json({task,message:"CreateTask"});
 } catch (error) {
  res.status(400).json({message:"Error with createTask"});
 }
})

router.get('/getTask',auth,async (req,res)=>{
  try {
    // we will be matching all the tasks belonging to to owner and returning that
    const tasks=await Task.find({
      owner:req.user._id
    })

    res.status(200).json({
      tasks,
      count:tasks.length,
      message:"Got_Tasks"
    })
  } catch (error) {
    res.status(400).json({message:"error with getTask"});
  }
})

router.get('/getSpecificTask/:id',auth,async (req,res)=>{
  const taskid=req.params.id
  try {
    const task=await Task.findOne({
      _id:taskid,
      owner:req.user._id
    })
    if(!task)
{
  throw new Error("error with updateTask")
}
res.status(200).json({message:"updateRoute working",
user:req.user})
  } catch (error) {
    res.status(400).json({message:"error with getSpecificTask"});
  }
})

router.patch('/updateTask/:id',auth,async (req,res)=>{
  const taskid=req.params.id
  const updates=Object.keys(req.body); // extracting desciption and completed from body<<
  
  const allowedupdates=['description',"completed"]; // parameters that can 
  const isValidOperation=updates.every(update=>allowedupdates.includes(update))

  if(!isValidOperation)
  {
    throw new Error("error occured");
  }

  try {
    const task=await Task.findOne({
      _id:taskid,
      owner:req.user._id
    })
if(!task)
{
  throw new Error("error with updateTask")
}
updates.forEach(update=>task[update]=req.body[update])

await task.save();

  res.status(200).json({message:"updateRoute working",
  user:req.user})
}catch(error) {
    res.status(400).json({message:"error with updateTask"});
  }
});
  
router.delete('/deleteTask/:id',auth,async (req,res)=>{
  const taskid=req.params.id
  try {
    const task=await Task.findOneAndDelete({
      _id:taskid,
      owner:req.user._id
    })
    if(!task){
      return res.status(404).json({message: "Task not found"});
  }
  res.status(200).json({task, message: "Task Deleted Successfully"});
}catch(error) {
  res.status(400).json({message:"error with deleteTask"});
}
})

module.exports=router;
  

