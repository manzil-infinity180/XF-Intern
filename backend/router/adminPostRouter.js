const express = require("express");
const router = express.Router();
const adminPostController = require("../controller/adminPostController");
const adminController = require("../controller/adminController");
const redisCached = require("../middleware/redisCaching");

router.get('/',redisCached,adminPostController.viewAllPost)
router.get('/:id',redisCached,adminPostController.viewPost);

router.use(adminController.isAuthenticated);

router.post('/create',adminPostController.createPost);
router.patch('/update/:id',adminPostController.updatePost);
router.delete('/delete/:id',adminPostController.deletePost);


/* Admin - User Relation */

router.get('/all/post',redisCached,adminPostController.getAllPostofAdmin);
router.get('/allpost/:uuid',redisCached,adminPostController.getAllPostofOthers);
router.get('/applied/:id',redisCached,adminPostController.getAllUserApplied);
router.patch('/status/:id',redisCached,adminPostController.statusChange);

// router.patch('/user/:id',adminController.statusOnApplication)
module.exports = router;