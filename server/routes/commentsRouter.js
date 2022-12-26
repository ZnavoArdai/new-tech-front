const router=require("express").Router()

const {creatComment,deleteComments,getAllcomments,getCommentsByIdOfPost}=require("../controllers/commentsCtrl")


router.post("/:id",creatComment)
router.delete("/:id",deleteComments)
router.get("/",getAllcomments)
router.get("/:id",getCommentsByIdOfPost)











module.exports=router;