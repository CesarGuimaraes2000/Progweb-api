import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import axiosClient from '../../AxiosClient';


export default function ComentarioFormList(){
    const [torrents, setTorrents] = useState([]);
    const [users, setUsers] = useState([]);
    const [comentarios, setComentarios] = useState([]);

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

    const getComentarios = () => {
        axiosClient
        .get('/comentario/index')
        .then(({data}) => {
            setComentarios(data.data);
        })
            .catch((error)=>{
            console.log(error);
        });
    }

    useEffect(()=>{
        getTorrents();
        getUsers();
        getComentarios();
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
                        <h1>Comentários</h1>
                        <Link className="btn-add" to="/comentario/store" >Store</Link>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Mensagem</th>
                                <th>Usuário</th>
                                <th>Torrent</th>
                                <th className="center actions" colSpan={3}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                comentarios.length > 0 ? (
                                comentarios.map(comentario =>(
                                    <tr key = {comentario.id}>
                                       
                                        <td>{comentario.id}</td>
                                        <td>{comentario.mensagem}</td>
                                        <td>{users.find(user => user.id === comentario.user_id)?.name || 'Desconhecido'}</td>
                                        <td>{torrents.find(torrent => torrent.id === comentario.torrent_id)?.titulo || 'Desconhecido'}</td>
                                        <td className="center actions">
                                            <Link className ="btn-edit" to = {`/comentario/update/${comentario.id}`} >Update</Link>
                                        </td>
                                        <td className="center actions">
                                            <Link className ="btn-delete" to = {`/comentario/destroy/${comentario.id}`} >Destroy</Link>
                                        </td>
                                        <td className="center actions">
                                            <Link className ="btn-show" to ={`/comentario/show/${comentario.id}`} >Show</Link>
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