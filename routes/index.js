const express = require("express");
const verifyJWT = require("../middleware/verifyJWT");
const registerRoute = require('./register');
const loginRoute = require('./login');
const logoutRoute = require('./logout');
const refreshRoute = require('./refresh');
const ordersRoutes = require('./orders');
const productsRoute = require('./products.js');

const router = express.Router();

router.use('/register', registerRoute);
router.use('/login', loginRoute);
router.use('/logout', logoutRoute);
router.use('/refresh', refreshRoute);

router.use('/products', productsRoute);
// router.use('/products', verifyJWT, productsRoute);

router.use('/orders', ordersRoutes);
// router.use('/orders', verifyJWT, ordersRoutes);

module.exports = router;
