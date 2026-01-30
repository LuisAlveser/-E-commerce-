const express=require("express");
const userrouter=require("./routers/UserRouter");
const categoryrouter=require("./routers/CategoryRouter");
const productrouter=require("./routers/ProductsRouter");
const orderrouter=require("./routers/OrderRouter");
const orderItemrouter=require("./routers/OrderItem");
const cors=require('cors');
const app=express();
app.use(express.json());
app.use(cors());
app.listen(3001,()=>{
    console.log("Servidor ligado ");
});
app.use("/user",userrouter);
app.use("/category",categoryrouter);
app.use("/product",productrouter);
app.use("/order",orderrouter);
app.use("/orderItem",orderItemrouter);