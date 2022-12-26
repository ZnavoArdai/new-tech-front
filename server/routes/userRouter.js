const router=require("express").Router()

const {register,login,getAllUsers,getUserById,sendSmsMessage}=require("../controllers/usersCtrl")



router.post("/register",register)
router.post("/login",login)
router.get("/",getAllUsers)
router.get("/:id",getUserById)
router.get("/send/sms",  sendSmsMessage)







module.exports=router;

