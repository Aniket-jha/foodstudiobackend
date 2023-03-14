const express = require('express');
const router = express.Router();
const {getAllBanners,createBanner,deleteBanner} = require('../controllers/bannerController');
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth");

router.route('/banners').get(getAllBanners)

router.route('/admin/banner/new').post(isAuthenticatedUser,authorizeRoles("admin"),createBanner)

router.route(`/admin/banner/:id`).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteBanner)
module.exports = router;

