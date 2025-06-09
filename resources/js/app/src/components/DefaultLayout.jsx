import React, { Children } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useLogin } from '../context/ContextProvider'
import axiosClient from "../AxiosClient";

export default function DefaultLayout({children}){

    const navigate = useNavigate();
    const {token, _setUser, _setToken, user} = useLogin();

    if(!token){
        //return <Navigate to = "/login"/>
    }

    const onLogout = (e) =>{
        e.preventDefault();
        axiosClient.post('/login', user.email)
                   .then(()=>{
                    _setUser = ({});
                    _setToken = (null);
                    navigate('/login');
                   })
                   .catch((erro)=>{
                    console.log(erro);
                   })
    }
    return(
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/user/index" >Usuário</Link>
                <Link to="/categoria/index" >Categorias</Link>
                <Link to="/torrent/index" >Torrents</Link>
                <Link to="/comentario/index" >Comentários</Link>
                <Link to="/favorito/index" >Favoritos</Link>
                <Link to='/funcionario/index'>Funcionários</Link>
                <Link to='/veiculo/index'>Veículos</Link>
                <Link to='/servico/index'>Serviços</Link>
                <Link to='/gerenciamento/index'>Gerenciamentos</Link>
            </aside>
            <div className='content'>
                <header>
                    <div className='header'>
                        Sistema de controle
                    </div>
                    <div>
                        {/* {user.name} &nbsp; &nbsp; */}
                        Cesar
                    </div>
                    <button onClick={onLogout} className='btn-logout' href='#'>
                        Logout
                    </button>
                </header>
                <main>
                    { children }
                </main>
            </div>
        </div>
    )
}