import './Tela_de_Compra.css'

import { useEffect, useState } from 'react';
import axios from "axios";

import { useNavigate ,useLocation} from 'react-router-dom';
import { FaPen,FaUserCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TfiPackage } from "react-icons/tfi";
import { RiShoppingBag2Line,RiSubtractFill } from "react-icons/ri";


function Tela_de_Compra(){
    const location=useLocation();
    const produtos=location.state||[]
   
    console.log(produtos.user.role)
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
             <button className="botaotela" style={{ cursor: 'pointer' }}  > Voltar </button>
        
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
                 </li>   
                ))}
                </ul>
              
            </div>
 <button  className='botao3'>Comprar</button>
           </div>
           </>


        
    );
}
export default Tela_de_Compra;