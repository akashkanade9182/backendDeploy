const express = require("express")
const cors = require("cors")

const connection = require("./Config/db")
const instauserRouter = require("./Routes/user.route")
const instapostRoute = require("./Routes/instapost.route")
const CourseRoute = require("./Routes/Couse.route")
const accountRouter = require("./Routes/Account.Route")
const addsRoute = require("./Routes/Adds.route")
const companyRoute = require("./Routes/Company.route")

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*"
}))

app.use("/instauser", instauserRouter)
app.use("/instapost", instapostRoute)
app.use("/getcourse", CourseRoute);
app.use("/bankaccount", CourseRoute);
app.use("/adds", addsRoute)
app.use("/company",companyRoute)


app.listen(7000, async () => {
    try {
        await connection;
        console.log("server running on port 7000")

    }
    catch {
        console.log("error in server connection")
    }
})