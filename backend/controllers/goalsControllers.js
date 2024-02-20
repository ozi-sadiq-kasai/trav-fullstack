const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc Get goals
// @route GET/api/goals
// @access Private
const getGoals = asyncHandler(async(req,res)=>{

 const goals = await Goal.find({user: req.user.id})

 res.status(200).json(goals)
})

// @desc POST goals
// @route post/api/goals
// @access Private
const postGoal = asyncHandler(async(req,res)=>{
  if(!req.body.text){
  res.status(400)
  throw new Error('Please add a text field')
  }

  const goal = await Goal.create({
   text: req.body.text,
   user: req.user.id
  })

  res.status(200).json(goal)
})



// @desc PUT goals
// @route put/api/goals
// @access Private
const putGoal = asyncHandler(async(req,res)=>{

 const goal = await Goal.findById(req.params.id)

 if(!goal){
  res.status(400)
  throw new Error('Goal not found')
 }

const user = await User.findById(req.user.id)
// Check for user
if(!user){
 res.status(401)
 throw new Error('User not found')
}

// Make sure the logged in user matched the goal user
if(goal.user.toString() !== user.id){
 res.status(401)
 throw new Error('User not authorized')
}
 const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{new:true})
 res.status(200).json(updatedGoal)
})



// @desc DELETE goals
// @route delete/api/goals
// @access Private
const deleteGoal = asyncHandler(async(req,res)=>{

const goal = await Goal.findById(req.params.id)

// Check for the goal
if(!goal){
 res.status(400)
 throw new Error('Goal not found')
}
 await Goal.findByIdAndDelete(req.params.id,req.body)

// Check for user
const user = await User.findById(req.user.id)

if(!user){
 res.status(401)
 throw new Error('User not found')
}

// Make sure the logged in user matched the goal user
if(goal.user.toString() !== user.id){
 res.status(401)
 throw new Error('User not authorized')
}



 res.status(200).json(`goal deleted ${req.params.id}`)
})


module.exports = {
 getGoals,
 postGoal,
 putGoal,
 deleteGoal,
}

