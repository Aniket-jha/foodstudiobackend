const express = require('express');
const { getAllProducts, createProduct,updateProduct, deleProduct, getProductDetails, createProductReview, getAdminProducts, getProductReviews, deleteReviews, updateStock } = require('../controllers/productController');
const {isAuthenticatedUser,authorizeRoles} = require('../middleware/auth');

const router = express.Router();


router.route('/products').get(getAllProducts);
router.route('/products/updateStock/:id').put(updateStock);
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles("admin"),createProduct)
router.route(`/admin/product/:id`).put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct).delete(isAuthenticatedUser,authorizeRoles("admin"),deleProduct)
router.route(`/product/:id`).get(getProductDetails);
router.route(`/reviews`).put(isAuthenticatedUser,createProductReview);
router.route(`/reviews`).get(getProductReviews).delete(isAuthenticatedUser,deleteReviews);

module.exports = router;