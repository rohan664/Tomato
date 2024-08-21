// In-built import 
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require('cookie-parser');
// custom import
const userRoutes = require("./routes/user")
const userInfoRoutes = require("./routes/userInfo")
const {checkExpiryTime} = require("./middleware/user")

// intializaions
const app = express()
const PORT = 8000

// mongodb connection
mongoose.connect("mongodb://127.0.0.1:27017/backend")
.then(()=>{console.log("mongodb connected successfully")})
.catch((error)=>{console.log("mongodb connection faield",error)})

// middlware
app.use(express.json())
app.use(cors())
app.use(cookieParser())


// routes
app.use("/api/user",userRoutes)
app.use("/api/user-info",checkExpiryTime(),userInfoRoutes)


app.listen(PORT,()=>{console.log("server is started is at port",PORT)})
