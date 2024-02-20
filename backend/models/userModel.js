const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
 name:{
  type:String,
  required:[true,'Please add a name']
 },
 email:{
  type:String,
  required:[true,'Please add an email'],
  unique:true
 },
 password:{
  type:String,
  required:[true,'Please add a password']
 },
},
{
 timestamp:true
}
)


userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('user',userSchema)

