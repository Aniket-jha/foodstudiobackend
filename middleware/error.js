const  ErrorHandler = require("../utils/errorHandler");

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    if(err.name === "CastError"){
        const message = `Resource not found, Invalid : ${err.path}`;
        err = new ErrorHandler(message,400);
    }

    if(err.code === 11000){
        const message = `Duplicate ${Objecy.keys(err.keyValue)} value entered`;
        err = new ErrorHandler(message,400);
    }

    if(err.name === "jsonwebtokenError"){
        const message = "Json Web Token is invalid, try again";
        err = new ErrorHandler(message,401);
    }
      if(err.name === "TokenExpiredError"){
        const message = "Json Web Token is expired, try again";
        err = new ErrorHandler(message,401);
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    })

}