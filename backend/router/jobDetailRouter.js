const express = require("express");
const router = express.Router();
const profileController = require("../controller/profileController");
const appliedController = require("../controller/appliedController");
const userController = require("../controller/userController");
const experienceController = require("../controller/experienceController");
/* User Controller */

router.post('/register',userController.register);
router.post('/login',userController.login);
router.post('/verify',userController.verify);
router.post('/feedback',userController.giveFeedback);
router.post('/subscribe',userController.subscribeMe);

router.use(userController.isAuthenticated);
router.get('/get-user',userController.getUser);

router.get('/logout',userController.logout);

/* bookmark */
router.post('/add/bookmark',userController.addbookmark);
router.get('/bookmark',userController.expandBookmark);

/* Profile */

router.post('/profile',profileController.createJob);
router.patch('/update-pic',profileController.picUpload,profileController.updateUser);
router.patch('/update/details', userController.imageUpload, userController.updateUser);

/* Experience */

router.post('/exp',experienceController.createExp);

/* Applied */
router.post('/apply',appliedController.apoliedStatus);
router.get('/get-all',appliedController.getAllApplied);

// new applied way 
router.post('/applied',appliedController.applyToRole);

module.exports = router;