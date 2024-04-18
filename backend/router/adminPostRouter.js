const express = require("express");
const router = express.Router();
const adminPostController = require("../controller/adminPostController");
const adminController = require("../controller/adminController");
// const redisCached = require("../middleware/redisCaching");

router.get('/',adminPostController.viewAllPost)
router.get('/:id',adminPostController.viewPost);
router.post('/autocomplete',adminPostController.autoComplete);
router.post('/search',adminPostController.searchField);
router.use(adminController.isAuthenticated);

router.post('/create',adminPostController.createPost);
router.patch('/update/:id',adminPostController.updatePost);
router.delete('/delete/:id',adminPostController.deletePost);


/* Admin - User Relation */

router.get('/all/post',adminPostController.getAllPostofAdmin);
router.get('/allpost/:uuid',adminPostController.getAllPostofOthers);
router.get('/applied/:id',adminPostController.getAllUserApplied);
router.patch('/status',adminPostController.statusChange);
router.post('/status/getstatus',adminPostController.getStatusofApplied);
// router.patch('/user/:id',adminController.statusOnApplication)
module.exports = router;