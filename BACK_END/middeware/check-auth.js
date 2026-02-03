const jwttoken=require('jsonwebtoken');

async function check_auth (req,res,next){
    try{
        console.log( req.headers.authorization);
        
        const token  = req.headers.authorization.split(" ")[1];
        console.log(token);
        const decodedToken =jwttoken.verify(token,"olá");
       req.userData=decodedToken;
        if(decodedToken.role==="admin"){
            console.log(decodedToken.role)
             next();
        }
        else{
            res.status(403).json({message:"Acesso negado"})
        }
       
     
      
    }catch(error){
       return res.status(500).json({ error: error.message }); 
    }
}
module.exports={
  check_auth:check_auth,
}