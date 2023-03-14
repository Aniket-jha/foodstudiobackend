const Order = require('../models/orderModels');
const Product = require('../models/productModels');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncErrors');

exports.newOrder = catchAsyncError(async (req, res, next) => {
    
    const {shippingInfo, orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user:req.user._id
    });

    res.status(201).json({
        sucess:true,
        order
    })

})


exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user','name email');
    if(!order) return next(new ErrorHandler(404,'Order not found'));
    res.status(200).json({
        sucess:true,
        order
    })
})


exports.myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({user:req.user._id})
    res.status(200).json({
        sucess:true,
        orders
    })
})

exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        sucess:true,
        totalAmount,
        orders
    })
})

exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

      if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

    if(order.orderStatus === 'Delivered') return next(new ErrorHandler(400,'Order is already Delivered'));

    if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
})

async function updateStock(id,quantity){
    const product = await Product.findById(id);
    product.stock -= quantity;

    await product.save({validateBeforeSave:false});
}

exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if(!order) return next(new ErrorHandler(404,'Order not found'));
     await order.remove()

    res.status(200).json({
        sucess:true,
        
    })
})

