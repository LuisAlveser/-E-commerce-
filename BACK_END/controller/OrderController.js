const { where } = require("sequelize");
const {Order,User}=require("../models");

async function  adicionar (req,res) {
    const order={
        id_user:req.body.id_user,
        total_price: req.body.total_price,
        status: req.body.status,
    }
     const orderuser=await Order.create(order);
     if(orderuser){
        return res.status(201).json({messege:"Pedido criado com sucesso "});
     }
    
    try {
        
    } catch (error) {
          return res.status(500).json({messege:" Erro em criar pedido "});  
    }
    
}
async function mostrarPedidos(req,res) {
    try {
        const order= await Order.findAll({include:[{model:User,  attributes: { 
      exclude: ['password'] 
    }}]});
        if(order){
           return res.status(200).json(order);
        }
    } catch (error) {
        return res.status(500).json({messege:"Erro em mostrar pedidos"});
    }
    
}
async function atualizar(req,res) {
    const id=req.params.id;
    try{
    const order={
        total_price: req.body.total_price,
        status: req.body.status,
    }
    const neworder=await Order.update(order,{where:{id:id}}); 
    if(neworder>0){
     return    res.status(200).json({message:"Pedido atualizado com sucesso"});
    }
     return res.status(404).json({message:"Pedido não encontrado"})
   
        
    } catch (error) {
         return res.status(500).json({messege:"Erro atualizar produto "});
    }
    
}
async function deletarPedido(req,res) {
    const id = req.params.id;
    try {
        const order= await Order.destroy({where:{id:id}});
        if(order){
            return res.status(200).json({message:"Pedido excluido com sucesso"});

        }
        return res.status(404).json({message:"Pedido não encontrado"})
    } catch (error) {
         return res.status(500).json({messege:"Erro excluir produto "});
    }
    
}
module.exports={
    adicionar:adicionar,
    mostrarPedidos:mostrarPedidos,
    atualizar:atualizar,
    deletarPedido:deletarPedido,
}