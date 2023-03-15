const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require("cors")
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const banner = require("./routes/bannerRoute");
const payment = require("./routes/paymentRoutes");
const errorMiddleware = require("./middleware/error")
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileUpload')
const product = require('./routes/productRoute');
const bodyParser = require('body-parser');
const path = require("path");
app.use(
    express.urlencoded({ extended: true })
);

app.use(errorMiddleware);
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: ".env" });
}
//middeleware for error

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', banner);
app.use('/api/v1',payment);
app.get("/api/v1/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_KEY })
);

app.use(express.static(path.join(__dirname, "../fronend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../fronend/build/index.html"));
});

// Middleware for Errors
app.use(errorMiddleware);


module.exports = app;