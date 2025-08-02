const express=require("express");
const connectToDB = require("./config/db");
const userRoutes=require("./Routes/userRoutes")
const app=express();
app.use(express.json());



connectToDB();
const PORT=process.env.PORT || 3000;



app.use("/api/user",userRoutes)

app.listen(PORT,()=>console.log(`APP IS LISTENING ON THE PORT ${PORT}`))