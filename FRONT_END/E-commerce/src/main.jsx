import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Tela_Principal from '../src/components/Tela_Principal/Tela_Principal.jsx'
import Tela_Cadastro_Produto from './components/Tela_Cadastro_Produto/Tela_Cadastro_Produto.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<App/>}/>
     <Route path='/Tela_principal' element={<Tela_Principal/>}/>
      <Route path='/Tela_Cadastro_Produto' element={<Tela_Cadastro_Produto/>}/>
</Routes>
    </BrowserRouter>
  </StrictMode>,
)
