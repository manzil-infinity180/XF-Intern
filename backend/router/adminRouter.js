const express = require("express");
const router = express.Router();
// const redisCached = require("../middleware/redisCaching");
const adminController = require("../controller/adminController");
const userController = require("../controller/userController");
/* User Controller */

router.post('/register',adminController.register);
router.post('/login',adminController.login);
router.post('/verify',adminController.verify);
router.get('/:adminId',adminController.getAllAdminDetails);;
router.use(adminController.isAuthenticated);
router.get('/get/admin',adminController.getAdminDetail);
router.get('/user/:id',userController.getUserById);
router.get('/get/logout',adminController.logout);
router.patch('/update/details',adminController.imageUpload,adminController.updateDetails);
module.exports = router;