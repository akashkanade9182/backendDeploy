const express=require("express")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


const Usermodel = require("../Models/user.model")

const userRouter = express.Router();
const Authenticate=require("../Middleware/Authentication")



userRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let presentuser = await Usermodel.findOne({ email });
        if (presentuser) {
            res.send("email is already link to another account ")
        } else {
            let useremail=email.split("@");
            var usertype;
            if(useremail[1]==="masaischool.com"){
                usertype="admin"
            }else{
                usertype="user"
            }

            bcrypt.hash(password, 4, async function (err, hash) {
                const user = new Usermodel({ name,email, password: hash ,usertype})
                await user.save();
                res.send("signup successfully")

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
    const useremail=email.split("@")
    var usertype;
    if(useremail[1]==="masaischool.com"){
        usertype="admin"
    }else{
        usertype="user"
    }
    try {
        bcrypt.compare(password, hash_password, function (err, result) {
            if (result) {
                const token = jwt.sign({ "userId": userId }, 'shh');
                if (token) {
                    res.send({ "mess": "longin succefull", token: token,usertype })
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











module.exports = userRouter;