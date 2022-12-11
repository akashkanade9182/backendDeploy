const express=require("express");
const cors = require('cors')


const connection=require("./Config/db")
const UserRouter=require("./Routes/User.route")
const NoteRouter=require("./Routes/Note.route")
const authenticate=require("./Middleware/Authentication")

const app=express();
app.use(express.json());
app.use(cors({
    origin : "*"
}))



app.use("/",UserRouter);
app.use(authenticate)
app.use("/notes",NoteRouter)


app.listen(7000,async()=>{
    try{
        await connection;
        console.log("Connected to DB Successfully")
    }
    catch(err){
        console.log("Error connecting to DB")
        console.log(err)
    }
    console.log("Listening on PORT 7000")
})





