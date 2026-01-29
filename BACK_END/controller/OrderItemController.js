const { where } = require("sequelize");
const {Order_Item,Order,Products,sequelize}=require("../models");

async function adicionar(req,res) {
    try {
           await sequelize.transaction(async (t) => {
      const  order=await Order.findOne({where:{id:req.body.id_order}});
      const product =await Products.findOne({where:{id:req.body.id_product}});
     
      if(!order||!product){
        return res.status(404).json({message:"Pedido ou Produto inválidos"});
      }
      if( req.body.quantity>product.stock_quantity){
          return res.status(404).json({message:"Essa quantidade é maior que o estoque"});
      }
      
        const orderitem={
      id_order:order.id,
     id_product: product.id,
     quantity: req.body.quantity,
     unit_price:product.price
        }  
      
        const  orderItem=await Order_Item.create(orderitem);
        if(orderItem){
          
            await product.decrement('stock_quantity', { by: parseInt(orderItem.quantity) ,transaction:t});
   
           
            return res.status(201).json({message:"Pedido criado com sucesso "});
        }
         });
    } catch (error) {
         return res.status(500).json({message:"Erro em criar pedidos com items"});
    }
}

async function mostrarPedidosporId(req,res) {
    const id=req.params.id;
    try {
        const order_item =await Order_Item.findOne({where:{id:id},include:[{model:Order},{model:Products}]});
        if(order_item){
         return    res.status(200).json(order_item);
        }
        return res.status(404).json({message:"Items não encontrados"});
    } catch (error) {
         return res.status(500).json({message:"Erro em buscar pedidos com items"});
    }
    
}
module.exports={
    adicionar:adicionar,
    mostrarPedidosporId:mostrarPedidosporId,
}

    
