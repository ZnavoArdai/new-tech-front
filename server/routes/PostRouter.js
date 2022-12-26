const router=require("express").Router()

const {getAllPosts,createPost,getPostById,updatePost,deletePost}=require("../controllers/postsCtrl")



router.get("/",getAllPosts)
router.post("/",createPost)
router.get("/:id",getPostById)
router.put("/:id",updatePost)
router.delete("/:id",deletePost)
module.exports=router;

