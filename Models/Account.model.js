const mongoose = require("mongoose")

const accountSchema=mongoose.Schema({
    name:{
     type: String,
     required: true
 },
    gender:{
     type: String,
     required: true
 },
    mobile:{
     type: Number,
     required: true
 },
    email:{
     type: String,
     required: true
 },
    dob:{
     type: String,
     required: true
 },
    address:{
     type: String,
     required: true
 },
    adhar:{
     type: Number,
     required: true
 },
    pan:{
     type: String,
     required: true
 },
    initialBalance:{
     type: Number,
     required: true
 },
})

const AccountModel = mongoose.model('bankaccount',accountSchema)

module.exports={
    AccountModel
}