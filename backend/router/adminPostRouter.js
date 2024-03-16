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

module.exports = router;