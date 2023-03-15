const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const cloudinary = require("cloudinary")
const Razorpay = require("razorpay")
//Handling Uncaught Exception




process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`)
    console.log("Shutting down the server due to uncaught exception")
    process.exit(1)
})

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: ".env" });
}


console.log(process.env.DB_URL)


connectDB();

cloudinary.config({
    cloud_name:"foodstudio2",
    api_key:'246939518728295',
    api_secret:'U4fKo1fxuf8Npxer_26j_Q811iY'
})





const server = app.listen(4000, () => {
    console.log('Server is running on ' + 4000);
});





process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`)
    console.log(`Shutting down the server due to unhandled Promise Rejection`)
    server.close(()=>{
        process.exit(1);
    })
})

