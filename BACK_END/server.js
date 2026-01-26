const express=require("express");
const userrouter=require("./routers/UserRouter");
const categoryrouter=require("./routers/CategoryRouter");
const app=express();
app.use(express.json());

app.listen(3001,()=>{
    console.log("Funcioando");
});
app.use("/user",userrouter);
app.use("/category",categoryrouter);