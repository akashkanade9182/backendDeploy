const express = require("express")
const bcrypt = require('bcrypt');
const projectuserRouter = express.Router()
const ProjectUsermodel = require("../Models/Projectuser.model");




projectuserRouter.post("/login", async (req, res) => {

     if ( !req.body.email || !req.body.password) {
          res.status(422).json({
               Success: false,
               Message : "please fill all details"
               })
     }
     const { email, password } = req.body;


     try {
        
               bcrypt.hash(password, 4, async function (err, hash) {
                    const user = new ProjectUsermodel({ email, password: hash})
                    await user.save();
                    res.status(200).send({
                         Success: true,
                         Message : "Valid User"
                         }
                         )

               });
     }
     catch (err) {
          console.log(err)
          res.status(200).send({
               Success: false,
               Message : "Invalid User"
               })
     }

})











module.exports = projectuserRouter