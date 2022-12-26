const env=require("dotenv");
env.config();
const cors=require("cors");
const express=require("express");
const db=require("./db");
const mongoose=require("mongoose")

mongoose.set("strictQuery", false);

const app=express();
const port=6060;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
const userRouter=require("./routes/userRouter")
const postsRouter=require("./routes/PostRouter")

const commentsRouter=require("./routes/commentsRouter")

app.use("/user/api",userRouter)
app.use("/posts/api",postsRouter)
app.use("/comments/api",commentsRouter)


app.get("/",(req,res)=>{
res.send("server connected")
})



app.listen(port,()=>{

    console.log( `listening on port ${port}`)
})



