
const router = require("express").Router()
const auth = require("../middleware/auth")
const controller = require("../controllers/postController")

router.get("/", auth, controller.getPosts)
router.get("/:id", auth, controller.getPost)
router.post("/", auth, controller.createPost)
router.put("/:id", auth, controller.updatePost)
router.delete("/:id", auth, controller.deletePost)

module.exports = router
