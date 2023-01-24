const express=require("express");
const cors=require("cors")


const connection=require("./Config/db")
const userRouter=require("./Routes/user.route.js");
const jobRouter=require("./Routes/job.route")
const applyRouter=require("./Routes/apply.route")


const app=express();
app.use(express.json());
app.use(cors({
    origin:"*"
}))


app.use("/",userRouter)
app.use("/jobs",jobRouter)
app.use("/apply",applyRouter)

app.listen(7000,async()=>{
   try{ await connection;
    console.log("server is running on port 7000")}
    catch(e){
        console.log("error in mongodb connection")
    }
})