const express=require("express")
const cors=require("cors")


const userRouter=require("./Routes/user.route")
const connection=require("./Config/db")


const app=express();
app.use(express.json())
app.use(cors({
    origin:"*"
}))

app.use("/",userRouter)




app.listen(7000,async()=>{
try{
    await connection
    console.log("server is running on port 7000")
}
catch(err){
    console.log("err in mongodb connection")
}
   
})