const{User}=require("../models");
const bcrypt = require('bcrypt');
const jwttoken=require('jsonwebtoken');
const { where } = require("sequelize");
 

async function cadastro(req,res) {
    try{
        const {name,password,email,role}= req.body;
        if(!password||!name||!email||!role){
          return   res.status(400).json({message:"Preecha todos os campos"});
        }
    
    const saltrounds=10;
   const salt = await  bcrypt.genSalt(saltrounds);
     const passwordhash= await bcrypt.hash(password,salt);
    const  user={
        name,
        email,
        password: passwordhash,
        role
     };   
     const novouser=await User.create(user);
     if(novouser){
        const token =jwttoken.sign({id:novouser.id,email:novouser.email,name:user.name,role:novouser.role},"olá", { expiresIn: '24h' });
      return   res.status(201).json({message:"Usuário criado com sucesso",token:token});
     }
    }

    catch(error){
        res.status(500).json({message:"Erro ao cadastrar usuário "});
    }
}
async function login(req,res) {
   try {
        const password=req.body.password;
        const email=req.body.email;
        if(!password||!email){
             return res.status(400).json({ error: "Email e senha são obrigatórios." });
        }
        const user= await User.findOne({where:{email:email}});
        if (!user) {
            return res.status(401).json({ error: "Email ou senha inválidos." });
        }
        const userpassword=await bcrypt.compare(password,user.password);
       
        if(!user||!userpassword){
             return res.status(400).json({ error: "Email e senha inválidos." });
        }
        const token=jwttoken.sign({id:user.id,email:user.email,role:user.role,name:user.name},"olá", { expiresIn: '24h' });
        return res.status(200).json({user:{id:user.id,role:user.role},message:"Login feito com sucesso",token:token});
   } catch (error) {
      res.status(500).json({message:"Erro ao fazer o login "});
   } 
}
async function atualizar(req,res) {
    try {
        const id = req.params.id;
        const useratualizado={
            name:req.body.name,
            email:req.body.email,
        }
        if(req.body.password){
        const saltrounds=10;
        const salt = await  bcrypt.genSalt(saltrounds);
        const passwordhash= await bcrypt.hash(password,salt);
      
            useratualizado.password=passwordhash;
        
        }
        const user=await User.update(useratualizado,{where:{id:id}});
        if(user>0){
          return   res.status(200).json({message:"Usuário atualizado com sucesso"});
        }
        return  res.status(404).json({message:"Usuário não encontrado"});
    } catch (error) {
          return res.status(500).json({message:"Erro ao atualizar usuário"});
    }
    
}
async function deletar(req,res) {
    const id =req.params.id;
    try {
        const user=await User.destroy({where:{id:id}});
        if(user){
          return  res.status(200).json({message:"Usuário excluido com sucesso "})
        }
        return res.status(404).json({message:"Usuário naõ encontrado"});
    } catch (error) {
        return res.status(500).json({message:"Erro ao excluir usuário"}); 
    }
    
}
module.exports={
    cadastro:cadastro,
    login:login,
    atualizar:atualizar,
    deletar:deletar,
}