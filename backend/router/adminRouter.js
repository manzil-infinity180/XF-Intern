const express = require("express");
const router = express.Router();
const redisCached = require("../middleware/redisCaching");
const adminController = require("../controller/adminController");
/* User Controller */

router.post('/register',adminController.register);
router.post('/login',adminController.login);
router.post('/verify',adminController.verify);

router.use(adminController.isAuthenticated);
router.get('/get-admin',redisCached,adminController.getAdminDetail);

router.get('/logout',adminController.logout);

module.exports = router;