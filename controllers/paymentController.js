
const Razorpay = require("razorpay")
const dotenv = require('dotenv');
const crypto = require("crypto");
const catchAsyncError = require('../middleware/catchAsyncErrors');
const { Payment } = "../models/paymentModel.js";
dotenv.config({ path: "backend/config/config.env" });
const paymentInstance = new Razorpay({
    key_id : "rzp_test_WyxFn2q5kOjQy3",
    key_secret : "oHSSYuEscX8V4ku1K12E3k5p"
})
exports.createPayment = catchAsyncError(async(req,res,next)=>{
 
         const options = {
        amount :(req.body.amount*100),
        currency: "INR",
        receipt:"rcp1"
         }

        
    const payment  = await paymentInstance.orders.create(options)
     res.status(200).json({
        success:true,
        payment:payment,
    })
    console.log(payment)
   
   
 
   
})

exports.paymentVerification = catchAsyncError(async(req,res,next)=>{

    const {razorpay_order_id, razorpay_payment_id,razorpay_signature} = req.body
    
     const body=razorpay_order_id + "|" + razorpay_payment_id;

  
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");
                                  console.log("sig received " ,razorpay_signature);
                                  console.log("sig generated " ,expectedSignature);
 
    const isAuthentic = expectedSignature === razorpay_signature
    if(isAuthentic){
        await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
        res.redirect(
            `http://localhost:3001/paymentsuccess?reference=${razorpay_payment_id}`
        );
        
    }
    
    else{
            res.status(400).json({
        success:false,
       
    })
    }
   
})