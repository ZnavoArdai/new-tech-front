const mongoose=require("mongoose");

const db_connection=process.env.DB_CONNECTION;
mongoose.connect(db_connection,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{console.log("Connection succeed")})
.catch((err)=>{console.error("connection faild",err.massage)})


module.exports=mongoose.connection;