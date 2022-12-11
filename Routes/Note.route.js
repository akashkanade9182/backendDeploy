const express=require("express")
const mogoose=require("mongoose");
const bcrypt = require('bcrypt');
const  jwt = require('jsonwebtoken');

const Notemodel = require("../Models/Note.model")



const NoteRouter=express.Router();

NoteRouter.get("/",async(req,res)=>{
    const notes = await Notemodel.find()
    res.send(notes)
})

NoteRouter.post("/addnotes",async(req,res)=>{
    const payload = req.body
   
    try{
        const new_note = new Notemodel(payload)
        await new_note.save()
        res.send({"msg" : "Note created successfully"})
    }
    catch(err){
        console.log(err)
        res.send({"err" : "Something went wrong"})
    }
})


NoteRouter.patch("/update/:noteId",async(req,res)=>{
    const noteID = req.params.noteId;
    const userID = req.body.userId;
    const payload=req.body

    const note = await Notemodel.findOne({_id:noteID})

    if(userID !== note.userId){
        res.send("Not authorised")
    }
    else{
        await Notemodel.findByIdAndUpdate({_id : noteID},payload)
        res.send({"msg" : "Note updated successfully"})
    }
res.send("update");


})



NoteRouter.put("/replace/:noteId",async(req,res)=>{

    const noteID = req.params.noteId;
    const userID = req.body.userId;
    const payload=req.body

    const note = await Notemodel.findOne({_id:noteID})

    if(userID !== note.userId){
        res.send("Not authorised")
    }
    else{
        await Notemodel.findByIdAndUpdate({_id : noteID},payload)
        res.send({"msg" : "Note updated successfully"})
    }
res.send("update");




})


NoteRouter.delete("/delete/:noteId",async(req,res)=>{

    const noteID = req.params.noteId
    await Notemodel.findByIdAndDelete({_id : noteID})
    res.send({"msg" : "Note deleted successfully"})





})





module.exports=NoteRouter;



