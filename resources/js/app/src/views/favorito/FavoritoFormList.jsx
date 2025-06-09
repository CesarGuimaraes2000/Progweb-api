import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import axiosClient from '../../AxiosClient';


export default function FavoritoFormList(){
    const [torrents, setTorrents] = useState([]);
    const [users, setUsers] = useState([]);
    const [favoritos, setFavoritos] = useState([]);

    const getTorrents = () => {
        axiosClient
        .get('/torrent/index')
        .then(({data}) => {
            setTorrents(data.data);
        })
            .catch((error)=>{
            console.log(error);
        });
    }

    const getUsers = () => {
        axiosClient
        .get('/user/index')
        .then(({data}) => {
            setUsers(data.data);
        })
            .catch((error)=>{
            console.log(error);
        });
    }

    const getFavoritos = () => {
        axiosClient
        .get('/favorito/index')
        .then(({data}) => {
            setFavoritos(data.data);
        })
            .catch((error)=>{
            console.log(error);
        });
    }

    useEffect(()=>{
        getTorrents();
        getUsers();
        getFavoritos();
    },[]);
    return(
        <div>
            <div className="display">
                <div className = "card animated fadeInDown">
                    <div style={{ 
                        display:'flex',
                        justifyContent:'space-between',
                        alignItems:'center'
                    }}>
                        <h1>Favoritos</h1>
                        <Link className="btn-add" to="/favorito/store" >Store</Link>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Usuário</th>
                                <th>Torrent</th>
                                <th className="center actions" colSpan={3}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                favoritos.length > 0 ? (
                                favoritos.map(favorito =>(
                                    <tr key = {favorito.id}>
                                       
                                        <td>{favorito.id}</td>
                                        <td>{users.find(user => user.id === favorito.user_id)?.name || 'Desconhecido'}</td>
                                        <td>{torrents.find(torrent => torrent.id === favorito.torrent_id)?.titulo || 'Desconhecido'}</td>
                                        <td className="center actions">
                                            <Link className ="btn-edit" to = {`/favorito/update/${favorito.id}`} >Update</Link>
                                        </td>
                                        <td className="center actions">
                                            <Link className ="btn-delete" to = {`/favorito/destroy/${favorito.id}`} >Destroy</Link>
                                        </td>
                                        <td className="center actions">
                                            <Link className ="btn-show" to ={`/favorito/show/${favorito.id}`} >Show</Link>
                                        </td>
                                    </tr>
                                ))
                                ):(
                                    <tr>
                                        <td>Nenhum Registro Localizado</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}