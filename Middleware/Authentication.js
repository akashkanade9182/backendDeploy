const jwt = require("jsonwebtoken")

const Authenticate=(req,res,next)=>{

    const token=req.headers?.authorization?.split(" ")[1]
     if(token){
        const decoded = jwt.verify(token, 'shh');
        if(decoded){
            const userId = decoded.userId
            req.body.author = userId;
            req.body.name=decoded.name;
            req.body.avatar=decoded.avatar;
            next()
        }
        else{
            res.status(400).send("Please login")
        }  

     }else{
        res.status(400).send("please login")
     }



  

}
module.exports=Authenticate;