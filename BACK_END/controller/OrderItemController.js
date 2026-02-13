const { where } = require("sequelize");
const {Order_Item,Order,Products,sequelize}=require("../models");

async function adicionar(req, res) {
  try {
    const novoItem = await sequelize.transaction(async (t) => {
      
      
      const product = await Products.findOne({ 
        where: { id: req.body.id_product },
        transaction: t 
      });

      if (!product) {
        throw new Error("PRODUTO_NAO_ENCONTRADO");
      }

      if (req.body.quantity > product.stock_quantity) {
        throw new Error("ESTOQUE_INSUFICIENTE");
      }

      
      const orderItem = await Order_Item.create({
        id_product: product.id,
        id_order:req.body.id_order,
        quantity: req.body.quantity,
        unit_price: req.body.unit_price,
      
      }, { transaction: t });

     
      await product.decrement('stock_quantity', { 
        by: parseInt(req.body.quantity), 
        transaction: t 
      });

      return orderItem;
    });

    
    return res.status(201).json({ 
      message: "Item adicionado com sucesso", 
      data: novoItem 
    });

  } catch (error) {
    console.error("ERRO NO BACKEND:", error); 

    if (error.message === "PRODUTO_NAO_ENCONTRADO") {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    if (error.message === "ESTOQUE_INSUFICIENTE") {
      return res.status(400).json({ message: "Estoque insuficiente" });
    }

    return res.status(500).json({ 
      message: "Erro interno ao processar pedido",
      error: error.message 
    });
  }
}

async function mostrarPedidosporId(req,res) {
    const id=req.params.id;
    try {
        const order_item =await Order_Item.findOne({where:{id:id},include:[{model:Products},{model:Order}]});
        if(order_item){
         return    res.status(200).json(order_item);
        }
        return res.status(404).json({message:"Items não encontrados"});
    } catch (error) {
         return res.status(500).json({message:"Erro em buscar pedidos com items"});
    }
    
}
async function mostrarPedidosPorUser(req,res) {
      try {
        
    const id =req.params.id;
    const order_user =await Order.findOne({where:{id_user:id}});
   
    
    if(!order_user){
     
        return res.status(404).json({message:"Pedidos não encontrados"});
    }
    const order_item =await Order_Item.findAll({where:{id_order:order_user.id },include:[{model:Products},{model:Order}]});
    if(order_item){
         return    res.status(200).json(order_item);
    }

    }catch (error) {
         return res.status(500).json({message:"Erro em buscar pedidos com items"});
      } 
    
}
module.exports={
    adicionar:adicionar,
    mostrarPedidosporId:mostrarPedidosporId,
    mostrarPedidosPorUser:mostrarPedidosPorUser
}

    
