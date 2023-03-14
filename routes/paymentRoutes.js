const express =  require('express');
const {createPayment, paymentVerification} = require("../controllers/paymentController")
const router = express.Router();
router.route("/orders").post(createPayment)
router.route("/paymentverification").post(paymentVerification)
module.exports = router;