const express = require('express');
const { AccountModel } = require('../Models/Account.model');

const accountRouter = express.Router();


accountRouter.get('/:id',async(req,res)=>{
    try{
        const account =await AccountModel.find({"_id":id})
      return  res.status(200).send(account)
    }catch(err){
       return res.status(400).send(err)
    }
})

accountRouter.post('/openaccount',async(req,res)=>{
    const payload = req.body
    payload.initialBalance=0
    try{
        const account = new AccountModel(payload)
        await account.save()
      return  res.status(200).send("account created!")
    }catch(err){
      return  res.status(400).send(err)
    }
})

accountRouter.patch('/deposit/:id',async(req,res)=>{
    const id = req.params.id
    const payload = req.body.amount
    
    try{
        const account = await AccountModel.findById({"_id":id})
        account.initialBalance+=payload
        account.save()
      return  res.status(200).send("Money deposited !")  
    }catch(err){
       return res.status(400).send(err)
    }
})
accountRouter.patch('/withdraw/:id',async(req,res)=>{
    const id = req.params.id
    const payload = req.body.amount
    
    try{
        const account = await AccountModel.findById({"_id":id})
        account.initialBalance-=payload
        account.save()
       return res.status(200).send(`Money withdrawn ${payload} !`)  
    }catch(err){
       return res.status(400).send(err)
    }
})
accountRouter.patch('/transfer/:id',async(req,res)=>{
    const id = req.params.id
    const amount = req.body.amount
    const toName = req.body.toName
    
    try{
        const sender = await AccountModel.findById({"_id":id})
        const reciever = await AccountModel.find({"name":toName})
        sender.initialBalance-=amount
        reciever[0].initialBalance+=amount
        reciever[0].save()
        sender.save()
       return res.status(200).send(`Money transfered to ${toName} !`)  
    }catch(err){
      return  res.status(400).send(err)
    }
})

accountRouter.patch('/updateaccount/:id',async(req,res)=>{
    const id=req.params.id
    const payload = req.body
    try{
     await AccountModel.findByIdAndUpdate({ _id: id }, payload, {
               new: true
          })

   
      return  res.status(200).send({"msg":"update account Successfuly!"})

    }catch(err){
      return  res.status(400).send(err)
    }
})
accountRouter.delete('/delete/:id',async(req,res)=>{
    const id=req.params.id
    const num=req.params.num
    try{
       const person =  await AccountModel.findByIdAndDelete(id)
       return res.status(200).send("account deleted")
    }catch(err){
       return res.status(400).send(err)
    }
})


module.exports=accountRouter;
