const Banner = require('../models/bannerModels');
const catchAsyncError = require('../middleware/catchAsyncErrors');
const cloudinary = require('cloudinary')
exports.createBanner = catchAsyncError(async (req, res, next) => {
     let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }


  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "banners",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
    if(!images) return next(new ErrorHandler(400,'Please provide images'));
    const banner = await Banner.create(req.body);
    res.status(201).json({
        sucess:true,
        banner:banner
    })

   
})

exports.getAllBanners = catchAsyncError(async (req, res, next) => {
    const banners = await Banner.find();
    res.status(200).json({
        sucess:true,
        banners
    })
})

exports.deleteBanner = catchAsyncError (async(req,res,next)=>{
    const banner = await Banner.findById(req.params.id);
    if(!banner){
        return res.status(500).json({
             success:false,
            message:"Banner not found"
        })

    }

    await banner.remove()
    res.status(200).json({
        success:true,
        message:"Banner Deleted Succesfully"
    })
})