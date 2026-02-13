const express=require("express");
const OrderItemController=require("../controller/OrderItemController");
const router= express.Router();
router.get("/user/:id",OrderItemController.mostrarPedidosPorUser)
router.post("/",OrderItemController.adicionar);
router.get("/:id",OrderItemController.mostrarPedidosporId);

module.exports=router;