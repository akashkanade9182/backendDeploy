const express = require("express")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


const Usermodel = require("../Models/user.model")
const Calmodel = require("../Models/calculate.model")

const userRouter = express.Router();
const Authenticate=require("../Middleware/Authentication")



userRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let presentuser = await Usermodel.findOne({ email });
        if (presentuser) {
            res.send("email is already link to another account ")
        } else {

            bcrypt.hash(password, 4, async function (err, hash) {
                const user = new Usermodel({ name,email, password: hash })
                await user.save();
                res.send("Singup Succefully")

            });

        }


    }
    catch (err) {
        console.log(err)
        res.send("error in signup")
    }

})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const presentuser = await Usermodel.find({ email });
    if (presentuser.length === 0) {
        res.send("wrong email")
    }
    const hash_password = presentuser[0].password;
    const userId = presentuser[0]._id;
    try {
        bcrypt.compare(password, hash_password, function (err, result) {
            if (result) {
                const token = jwt.sign({ "userId": userId }, 'shh');
                if (token) {
                    res.send({ "mess": "longin succefull", token: token })
                } else {
                    res.send("error in getting token")
                }

            } else {
                res.send("password or username is wrong")
            }
        });


    }
    catch (err) {
        console.log(err);
        res.send("error in login")

    }
})



userRouter.post("/calculate",(req,res)=>{
    const{amount,interest,year}=req.body;
   
   const P = amount
   const  i =interest / 100
   const n = year
   const c= ((1+i)**n)-1
   const F= P*(c/i)
   const Iamount=amount*year;
   const Ginterest=F-Iamount;

   res.send({totalInvestmentAmount:Math.floor(Ginterest),
  totalInterestGained:Math.floor(Ginterest),
  totalMaturityValue:Math.floor(F)})




})



userRouter.use(Authenticate);

userRouter.get("/getProfile",async(req,res)=>{
    const userId=req.body.userId
    let user=await Usermodel.findOne({_id:userId})
    console.log(user)
    if(user){
        res.send(user)
    }else{
        res.send("user is not found")
    }
})




module.exports = userRouter;