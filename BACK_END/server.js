const express=require("express");
const userrouter=require("./routers/UserRouter");
const app=express();
app.use(express.json());

app.listen(3001,()=>{
    console.log("Funcioando");
});
app.use("/user",userrouter);