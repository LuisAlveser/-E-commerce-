const { where } = require("sequelize");
const {Category}=require("../models");

async function adicionar(req,res) {
   try {
     const category={
        name:req.body.name,
     }
     const newcategory= await Category.create(category);
    console.log(newcategory);
     if(newcategory){
     return  res.status(201).json({message:"Categoria Criada com sucesso"});
     }
   } catch (error) {
    
   return  res.status(500).json({message:"Erro em adicionar categoria"});
    
   }    
}
async function atualizar(req,res) {
    try {
        const id =req.params.id;
        const cateroria={ name:req.body.name,}
       const categoria= await Category.update(cateroria,{where:{id:id}});
       console.log(categoria);
       if(categoria>0){
        return res.status(200).json({message:"Categoria atualizada"});
       }
       return res.status(404).json({message:"Categoria não encontrada"});
    } catch (error) {
          return  res.status(500).json({message:"Erro em atualizar  categoria"});
    }
    
}
async function excluir(req,res) {
    const id= req.params.id
    try {
        const category= await Category.destroy({where:{id:id}});
        if(category){
            res.status(200).json({message:"Categoria excluida com sucesso"});
        }
         res.status(404).json({message:"Categoria não encontrada"});
    } catch (error) {
        return  res.status(500).json({message:"Erro em excluir  categoria"}); 
    }    
}
async function todasCategorias(req,res) {
    try{
        const categorias=await Category.findAll();
        if(categorias){
            res.status(200).json(categorias)
        }
    }catch (error) {
        return  res.status(500).json({message:"Erro em buscar  categorias"}); 
    }  
    
}
async function cateroriaporId(req,res) {
    const id= req.params.id;
    try {
        const categoria=await Category.findOne({where:{id:id}});
        if(categoria){
         return   res.status(200).json(categoria);
        }
        res.status(404).json({message:"Categoria não encontrada"});
    } catch (error) {
          return  res.status(500).json({message:"Erro em buscar  categoria"}); 
    }
    
}
module.exports={
  adicionar:adicionar,
  atualizar:atualizar,
  excluir:excluir,
  todasCategorias:todasCategorias,
  cateroriaporId:cateroriaporId,
}