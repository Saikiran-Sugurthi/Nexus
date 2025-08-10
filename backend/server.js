const express=require("express");
const connectToDB = require("./config/db");
const userRoutes=require("./Routes/userRoutes")
const webinarRoutes=require("./Routes/webinarRoutes")
const {errorHandler}=require("./middleWares/errorMiddleware")
const app=express();
app.use(express.json());

const cors=require("cors");
app.use(cors());



connectToDB();
const PORT=process.env.PORT || 3000;



app.use("/api/user",userRoutes)
app.use("/api/webinars",webinarRoutes);
app.use(errorHandler)


app.listen(PORT,()=>console.log(`APP IS LISTENING ON THE PORT ${PORT}`))