import { useState } from "react";
import './App.css'
import { FaUserCircle ,FaSpinner} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import axios from "axios";
import { useNavigate,useLocation } from 'react-router-dom';


function App() {
    const navigate = useNavigate();
      const location =  useLocation();
  const [nivel_acesso,setnivel_acesso]= useState("");
  const [nome,setnome]= useState("");
  const [email,setemail]=useState("");
  const [senha,setsenha]=useState("");
  const[logado,setlogado]=useState(false);
const [erro, setErro] = useState("");
 const [carregando,setCarregando]=useState(false);
 const   Cadastro =async (e)=>{
   e.preventDefault();
   if(!logado){
    //Cadastro
    setCarregando(true);
    const user ={
      name:nome,
      email:email,
      password:senha,
      role:nivel_acesso
    }
    try {
      const cadastro= await axios.post("http://localhost:3001/user/cadastro",user);
      if(cadastro.status===201){
        const{token, user}=cadastro.data;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          setCarregando(false);
          navigate('/Tela_Principal'); 
      }else{
        setCarregando(false);
         alert('Erro ao Cadastrar Usuário:');
      }
    } catch (error) {
       setCarregando(false);
            alert('Erro ao Cadastrar Usuário:', error);
    }

   }else{
     const user={
      email:email,
     password:senha,
     }
     try {
        const login=  await axios.post("http://localhost:3001/user/login",user);
        if(login.status===200){
            const { user, token } = login.data;
             localStorage.setItem('token', token);
             localStorage.setItem('user', JSON.stringify(user));
              setCarregando(false);
              console.log(user);
               navigate('/Tela_Principal',{state:{id:user.id,role:user.role}});
          }else{ 
            setCarregando(false);
              alert("Erro ao Logar Usuário")
            }
        
     } catch (error) {
       setCarregando(false);
      alert('Erro ao Logar  Usuário:', error);
     }

   }
 }

  
const handleCadastrar = (e) => {
  e.preventDefault();
  setErro(""); 
  
   if (!logado && nome.length < 3) {
    setErro("O nome deve ter pelo menos 3 caracteres.");
    return;
  }
  if(!logado&&nivel_acesso===""){
    setErro("O nível de acesso não pode estar vázio");
     return;
  }
  if (!email.includes("@")) {
    setErro("Insira um e-mail válido.");
    return;
  }
  if (senha.length < 6) {
    setErro("A senha deve ter no mínimo 6 dígitos.");
    return;
  }

  console.log("Enviado com sucesso!");
};
 const handleChange = (event) => {
    setnivel_acesso(event.target.value);
  };
  return (
    <>
      < div className='fundo'>
      <h1>{logado?"BEM  VINDO" :"CADASTRO"} </h1>
       <form className='form' onSubmit={Cadastro}>
        {erro && <p className="mensagem-erro">{erro}</p>}
       {logado?"":
        (<label className='label'>
        <FaUserCircle className='icon' />
        <input className='input' type="text" value={nome} onChange={(e)=>setnome(e.target.value)} />
        </label>)
}
         <label  className='label'>
         <MdEmail  className='icon'/>
         <input className='input' type="text" value={email} onChange={(e)=>setemail(e.target.value)} />
         </label>

         <label  className='label'>
         <MdOutlinePassword  className='icon'/>
        <input  className='input' type="password" value={senha} onChange={(e)=>setsenha(e.target.value)} />
        </label>
         

           {logado?"":(<div className="radio-group">
             <p className='texto'>Selecione sua opção:</p>
                    <label>
                        <input 
                            type="radio" 
                            name="nivel_acesso" 
                            value="admin" 
                            checked={nivel_acesso === "admin"} 
                            onChange={handleChange}
                        />
                       Admin
                    </label>

                    <label>
                        <input 
                            type="radio" 
                            name="nivel_acesso" 
                            value="cliente" 
                            checked={nivel_acesso === "cliente"} 
                            onChange={handleChange}
                        />
                      Cliente
                    </label>
                </div>)}
                <button className="botao2"> { carregando? <FaSpinner className="spinner" />:logado?"Login" :"Cadastro"} </button>
        </form>
      
  { logado?(<p> Não  tem  uma conta? <a className="a"href="" onClick={(e)=>{ e.preventDefault(); setlogado(false);}} >Cadastre-se  aqui!</a></p>)
  :(<p> Já tem  uma conta? <a className="a"href="" onClick={(e)=>{e.preventDefault();setlogado(true);}} >Faça login  aqui!</a></p>)}
      
      <p>
    Esqueceu sua senha <a className="a" href="" >Clique   aqui!</a>
</p>
         
          
      </div>
    
       
    
    </>
  )
}

export default App
