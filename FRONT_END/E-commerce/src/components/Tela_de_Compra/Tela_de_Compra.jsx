import './Tela_de_Compra.css'

import { useEffect, useState } from 'react';
import axios from "axios";

import { useNavigate ,useLocation} from 'react-router-dom';
import { FaPen,FaUserCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TfiPackage } from "react-icons/tfi";
import { RiShoppingBag2Line,RiSubtractFill } from "react-icons/ri";
import { ClipLoader } from "react-spinners";


function Tela_de_Compra(){
    const location=useLocation();
    const produtos=location.state||[]
     const navigate = useNavigate();
   
const [carrinho,setcarrinho]=useState(produtos.listaProdutos?produtos.listaProdutos:[]);
const [precoFinal,setprecoFinal]=useState("")




const[carrinhoAberto,setCarrinhoAberto]=useState(false);
const toggleCarrinho = () => {
  console.log(carrinhoAberto)
  setCarrinhoAberto(!carrinhoAberto);
};
const retiraritems=(id)=>{
 carrinho.pop(p=>p.id===id);
 setCarrinhoAberto([...carrinho]);
}

const adicionarquantidade=(id,quantidade)=>{
    const valor = parseInt(quantidade);
  const novocarrinho=carrinho.map(item=>{
    if(item.id===id){
      return { ...item,quantidade: valor };
    }
    return item;
  });
setcarrinho(novocarrinho);
console.log(carrinho);
}
const [totalcompras,settotalcompras]=useState('');
const[carregando,setCarregando]=useState(false);
const comprar=async ()=>{
    setCarregando(true)
     const token = localStorage.getItem("token"); 
   const total = carrinho.reduce( (acc, item) => {
   
    return acc + (Number(item.price) * (item.quantidade || 0));
  }, 0);

  
   

    try {
        const items_pedido = {
        id_user:  produtos.user?.id,
        total_price:total,
        status: 'pendente'
      };
console.log(items_pedido)
   const resposta=  await axios.post("http://localhost:3001/order", items_pedido);
  const   id_pedido=resposta.data.data.id;

    
    for (const item of carrinho) {
      
       

   
    const resposta_id=parseInt(id_pedido);
    
    
      const pedido={
        id_order:resposta_id,
        id_product: item.id,
        quantity: item.quantidade,
        unit_price:item.price
    }
    
    await axios.post("http://localhost:3001/orderItem", pedido);
    }
  
     

    setCarregando(false)
    alert("Compra realizada com sucesso!");
    navigate("/Tela_Principal");
    
  } catch (error) {
    setCarregando(false)
    console.error("Erro na compra:", error);
    alert("Houve um erro em um o  mais itens da sua compra.",error);
  }
  
}
const voltar=()=>{
 navigate("/Tela_Principal")
}
    return(
        <>
    <div className='cabecalho'> 
             <FaUserCircle className='icontela' />
           <h1>{  produtos.user?.name || "Usuário"}</h1>
                {produtos.user?.role && <div className='tag'>{produtos.user.role}</div>}
                {produtos.user?.role==="admin"?<span className='span'><TfiPackage  className='icons_tela' onClick={toggleCarrinho} />{buscar_produtos_por_usuario.length}
                 
                {carrinhoAberto&&(
    <div className="modal-carrinho" style={{
       position: 'absolute',
       right: '20px',
       top: '80px',
       backgroundColor: 'white',
       border: '1px solid #ccc',
       padding: '20px',
       zIndex: 1000,
       borderRadius: '10px',
       boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
       width: '300px',
       
       
     }}>
       <h3 className='carrinho_lista'>Produtos Cadastrados</h3>
       {carrinho.length === 0 ? (
         <p style={{color:"black"}}>Você não cadastrou nenhum produto</p>
       ) : (
         <ul style={{ listStyle: 'none', padding: 0 }}>
   
           {carrinho.map((item, index) => (
             
             <li key={index} style={{ marginBottom: '10px', borderBottom: '1px solid #eee' }}>
              <a className='carrinho_lista'><strong>{item.name}</strong> - R$ {item.price} <MdDelete  style={{ cursor: 'pointer' }}  onClick={()=>{deletarProduto(item)}} className='subtracao' />
              <FaPen className='pen' style={{ cursor: 'pointer' }} onClick={()=>{atualizarProduto(item)}} /> 
   
              </a>
             </li>
           ))}
         </ul>
       )}
       <div className='botoes'><button style={{ cursor: 'pointer' }} className="botaocompra"onClick={toggleCarrinho}>Fechar</button>
       
       </div>
   
     </div>)}
                 </span>:<span className='span'>
                 <RiShoppingBag2Line  onClick={toggleCarrinho} className='icons_tela'/>{carrinho.length}{carrinhoAberto && (
     <div className="modal-carrinho" style={{
       position: 'absolute',
       right: '20px',
       top: '80px',
       backgroundColor: 'white',
       border: '1px solid #ccc',
       padding: '20px',
       zIndex: 1000,
       borderRadius: '10px',
       boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
       width: '300px',
       
       
     }}>
       <h3 className='carrinho_lista'>Seu Carrinho</h3>
       {carrinho.length === 0 ? (
         <p>O carrinho está vazio</p>
       ) : (
         <ul style={{ listStyle: 'none', padding: 0 }}>
   
           {carrinho.map((item, index) => (
             
             <li key={index} style={{ marginBottom: '10px', borderBottom: '1px solid #eee' }}>
              <a className='carrinho_lista'><strong>{item.name}</strong> - R$ {item.price} <RiSubtractFill style={{ cursor: 'pointer' }} onClick={()=>{retiraritems(item.id)}} className='subtracao' /></a>
             </li>
           ))}
         </ul>
       )}
       <div className='botoes'><button  className="botaocompra"onClick={toggleCarrinho}>Fechar</button>
      
       </div>
   
     </div>
     
   )}</span>}
             <button className="botaotela" style={{ cursor: 'pointer' }} onClick={voltar} > Voltar </button>
        
           </div>
           <div className='fundo_das_compras'>
            <div className='produtos'>
                <h1>Itens do Carrinho</h1>
                <ul className='lista'>
                {(carrinho).map((item,index)=>(
                
                 <li key={index}>
                    
                   <span className='nome'>{item.name}</span>
                     <span className='nome'>{"R$"+ item.price}</span>
                    <span className='nome'>{"Descrição: "+ item.description}</span>
                    <span className='nome'>{'Quant:'}<input type='number' className='quantidade' value={item.quantidade|| 0} onChange={(e)=>adicionarquantidade(item.id,e.target.value )}></input></span>
                 </li>   
                ))}
                </ul>
              
            </div>
 <button  className='botao3' onClick={comprar}  >{carregando? <ClipLoader color="#ffffff"  size={20} />:'Comprar'}</button>
           </div>
           </>


        
    );
}
export default Tela_de_Compra;