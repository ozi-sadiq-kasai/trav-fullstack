const asyncHandler = require('express-async-handler')

// @desc Get goals
// @route GET/api/goals
// @access Private
const getGoals = asyncHandler(async(req,res)=>{
 res.status(200).json({
  message:'Get Goals'
 })
})

// @desc POST goals
// @route post/api/goals
// @access Private
const postGoal = asyncHandler(async(req,res)=>{
  if(!req.body.text){
  res.status(400)
  throw new Error('Please add a text field')
  }
  res.status(200).json({message:'Set goal'})
})
// @desc PUT goals
// @route put/api/goals
// @access Private
const putGoal = asyncHandler(async(req,res)=>{
 res.status(200).json({
  message:`Update Goal ${req.params.id}`
 })
})
// @desc DELETE goals
// @route delete/api/goals
// @access Private
const deleteGoal = asyncHandler(async(req,res)=>{
 res.status(200).json({
message:`Delete Goal ${req.params.id}`
 })
})


module.exports = {
 getGoals,
 postGoal,
 putGoal,
 deleteGoal,
}

