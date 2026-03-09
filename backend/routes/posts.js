
const router = require("express").Router()
const auth = require("../middleware/auth")
const ctrl = require("../controllers/postController")

router.get("/", auth, ctrl.getPosts)
router.get("/:id", auth, ctrl.getPost)
router.post("/", auth, ctrl.createPost)
router.put("/:id", auth, ctrl.updatePost)
router.delete("/:id", auth, ctrl.deletePost)

module.exports = router
