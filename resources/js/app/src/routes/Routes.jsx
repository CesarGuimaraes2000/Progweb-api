import React from 'react'
import  { Route,Routes } from 'react-router-dom';
import UserFormList from '../views/user/UserFormList';
import UserFormStore from '../views/user/UserFormStore';
import UserFormDestroy from '../views/user/UserFormDestroy';
import UserFormShow from '../views/user/UserFormShow';
import UserFormUpdate from '../views/user/UserFormUpdate';
import Layout from './Layout';
import Dashboard from '../components/Dashboard';
import NotFound from '../views/NotFound';
import Login from '../views/login/Login';
import SignUp from '../views/login/SignUp';
import UpdatePassword from '../views/login/UpdatePassword';
import ForgotPassword from '../views/login/ForgotPassword';
import CategoriaFormList from '../views/categoria/CategoriaFormList';
import CategoriaFormStore from '../views/categoria/CategoriaFormStore';
import CategoriaFormDestroy from '../views/categoria/CategoriaFormDestroy';
import CategoriaFormShow from '../views/categoria/CategoriaFormShow';
import CategoriaFormUpdate from '../views/categoria/CategoriaFormUpdate';
import TorrentFormList from '../views/torrent/TorrentFormList';
import TorrentFormStore from '../views/torrent/TorrentFormStore';
import TorrentFormDestroy from '../views/torrent/TorrentFormDestroy';
import TorrentFormShow from '../views/torrent/TorrentFormShow';
import TorrentFormUpdate from '../views/torrent/TorrentFormUpdate';
import ComentarioFormList from '../views/comentario/ComentarioFormList';
import ComentarioFormStore from '../views/comentario/ComentarioFormStore';
import ComentarioFormDestroy from '../views/comentario/ComentarioFormDestroy';
import ComentarioFormShow from '../views/comentario/ComentarioFormShow';
import ComentarioFormUpdate from '../views/comentario/ComentarioFormUpdate';
import FavoritoFormList from '../views/favorito/FavoritoFormList';
import FavoritoFormStore from '../views/favorito/FavoritoFormStore';
import FavoritoFormDestroy from '../views/favorito/FavoritoFormDestroy';
import FavoritoFormShow from '../views/favorito/FavoritoFormShow';
import FavoritoFormUpdate from '../views/favorito/FavoritoFormUpdate';
import FuncionarioFormList from '../views/funcionario/FuncionarioFormList';
import FuncionarioFormStore from '../views/funcionario/FuncionarioFormStore';
import FuncionarioFormDestroy from '../views/funcionario/FuncionarioFormDestroy';
import FuncionarioFormShow from '../views/funcionario/FuncionarioFormShow';
import FuncionarioFormUpdate from '../views/funcionario/FuncionarioFormUpdate';
import VeiculoFormList from '../views/veiculo/VeiculoFormList';
import VeiculoFormStore from '../views/veiculo/VeiculoFormStore';
import VeiculoFormDestroy from '../views/veiculo/VeiculoFormDestroy';
import VeiculoFormShow from '../views/veiculo/VeiculoFormShow';
import VeiculoFormUpdate from '../views/veiculo/VeiculoFormUpdate';
import ServicoFormList from '../views/servico/ServicoFormList';
import ServicoFormStore from '../views/servico/ServicoFormStore';
import ServicoFormDestroy from '../views/servico/ServicoFormDestroy';
import ServicoFormShow from '../views/servico/ServicoFormShow';
import ServicoFormUpdate from '../views/servico/ServicoFormUpdate';
import GerenciamentoFormList from '../views/gerenciamento/GerenciamentoFormList';
import GerenciamentoFormStore from '../views/gerenciamento/GerenciamentoFormStore';
import GerenciamentoFormDestroy from '../views/gerenciamento/GerenciamentoFormDestroy';
import GerenciamentoFormShow from '../views/gerenciamento/GerenciamentoFormShow';
import GerenciamentoFormUpdate from '../views/gerenciamento/GerenciamentoFormUpdate';
const Rotas = () => {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<SignUp/>}/>
      <Route path='/updatepassword' element={<UpdatePassword/>}/>
      <Route path='/forgotpassword' element={<ForgotPassword/>}/>
      <Route element={<Layout/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/user/index' element ={<UserFormList/>}/>
        <Route path='/user/store' element ={<UserFormStore/>}/>
        <Route path='/user/destroy/:id' element ={<UserFormDestroy/>}/>
        <Route path='/user/show/:id' element ={<UserFormShow/>}/>
        <Route path='/user/update/:id' element ={<UserFormUpdate/>}/>

        <Route path='/categoria/index' element ={<CategoriaFormList/>}/>
        <Route path='/categoria/store' element ={<CategoriaFormStore/>}/>
        <Route path='/categoria/destroy/:id' element ={<CategoriaFormDestroy/>}/>
        <Route path='/categoria/show/:id' element ={<CategoriaFormShow/>}/>
        <Route path='/categoria/update/:id' element ={<CategoriaFormUpdate/>}/>

        <Route path='/torrent/index' element ={<TorrentFormList/>}/>
        <Route path='/torrent/store' element ={<TorrentFormStore/>}/>
        <Route path='/torrent/destroy/:id' element ={<TorrentFormDestroy/>}/>
        <Route path='/torrent/show/:id' element ={<TorrentFormShow/>}/>
        <Route path='/torrent/update/:id' element ={<TorrentFormUpdate/>}/>

        <Route path='/comentario/index' element ={<ComentarioFormList/>}/>
        <Route path='/comentario/store' element ={<ComentarioFormStore/>}/>
        <Route path='/comentario/destroy/:id' element ={<ComentarioFormDestroy/>}/>
        <Route path='/comentario/show/:id' element ={<ComentarioFormShow/>}/>
        <Route path='/comentario/update/:id' element ={<ComentarioFormUpdate/>}/>
        
        <Route path='/favorito/index' element ={<FavoritoFormList/>}/>
        <Route path='/favorito/store' element ={<FavoritoFormStore/>}/>
        <Route path='/favorito/destroy/:id' element ={<FavoritoFormDestroy/>}/>
        <Route path='/favorito/show/:id' element ={<FavoritoFormShow/>}/>
        <Route path='/favorito/update/:id' element ={<FavoritoFormUpdate/>}/>

        <Route path='/funcionario/index' element ={<FuncionarioFormList/>}/>
        <Route path='/funcionario/store' element ={<FuncionarioFormStore/>}/>
        <Route path='/funcionario/destroy/:id' element ={<FuncionarioFormDestroy/>}/>
        <Route path='/funcionario/show/:id' element ={<FuncionarioFormShow/>}/>
        <Route path='/funcionario/update/:id' element ={<FuncionarioFormUpdate/>}/>

        <Route path='/veiculo/index' element ={<VeiculoFormList/>}/>
        <Route path='/veiculo/store' element ={<VeiculoFormStore/>}/>
        <Route path='/veiculo/destroy/:id' element ={<VeiculoFormDestroy/>}/>
        <Route path='/veiculo/show/:id' element ={<VeiculoFormShow/>}/>
        <Route path='/veiculo/update/:id' element ={<VeiculoFormUpdate/>}/>

        <Route path='/servico/index' element ={<ServicoFormList/>}/>
        <Route path='/servico/store' element ={<ServicoFormStore/>}/>
        <Route path='/servico/destroy/:id' element ={<ServicoFormDestroy/>}/>
        <Route path='/servico/show/:id' element ={<ServicoFormShow/>}/>
        <Route path='/servico/update/:id' element ={<ServicoFormUpdate/>}/>

        <Route path='/gerenciamento/index' element ={<GerenciamentoFormList/>}/>
        <Route path='/gerenciamento/store' element ={<GerenciamentoFormStore/>}/>
        <Route path='/gerenciamento/destroy/:id' element ={<GerenciamentoFormDestroy/>}/>
        <Route path='/gerenciamento/show/:id' element ={<GerenciamentoFormShow/>}/>
        <Route path='/gerenciamento/update/:id' element ={<GerenciamentoFormUpdate/>}/>
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}

export default Rotas  