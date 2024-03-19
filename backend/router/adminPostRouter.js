const express = require("express");
const router = express.Router();
const adminPostController = require("../controller/adminPostController");
const adminController = require("../controller/adminController");

router.get('/',adminPostController.viewAllPost)
router.get('/:id',adminPostController.viewPost);

router.use(adminController.isAuthenticated);

router.post('/create',adminPostController.createPost);
router.patch('/update/:id',adminPostController.updatePost);
router.delete('/delete/:id',adminPostController.deletePost);


/* Admin - User Relation */

router.get('/all/post',adminPostController.getAllPostofAdmin);
router.get('/allpost/:uuid',adminPostController.getAllPostofOthers);
router.get('/applied/:id',adminPostController.getAllUserApplied);
router.patch('/status/:id',adminPostController.statusChange);

// router.patch('/user/:id',adminController.statusOnApplication)
module.exports = router;