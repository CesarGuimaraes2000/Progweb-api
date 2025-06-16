import React, { Children } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useLogin } from '../context/ContextProvider'
import axiosClient from "../axiosClient";
import logo from '../assets/logo.png';
import { useValidarDadosLogin } from '../rules/LoginValidationRules';
import { useState ,useEffect} from "react";

export default function DefaultLayout({children}){
    const navigate = useNavigate();
    const {token, _setUser, _setToken} = useLogin();
    const [user, setUser] = useState({
            id: null,
            name: '',
            email: '',
        });
    const id = localStorage.getItem('Id');
    console.log(id);
    if(!token){
        return <Navigate to = "/login"/>
    }
    if(id){
        useEffect(() => {
            axiosClient.get(`user/show/${id}`)
            .then(({data})=>{
             console.log(data.data);
             setUser(data.data);
            })
            .catch((error)=>{
                console.log(error);
            });
        },[id]);
    }

    const onLogout = (e) =>{
        /* e.preventDefault();
        console.log(user);
        axiosClient.post('/logout')
                   .then(()=>{
                    _setUser({});
                    _setToken(null);
                    navigate('/login');
                   })
                   .catch((erro)=>{
                    console.log(erro);
                   }) */
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
                    <img className = 'header_logo' src={logo} alt="Logo" style={{ width: '120px' }}/>
                    <div className='header'>
                        Magnet BR
                    </div>
                    <div>
                        {user.name} &nbsp; &nbsp;
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