import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import axiosClient from '../../AxiosClient';


export default function TorrentFormList(){
    const [torrents, setTorrents] = useState([]);
    const [users, setUsers] = useState([]);
    const [categorias, setCategorias] = useState([]);

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

    const getCategorias = () => {
        axiosClient
        .get('/categoria/index')
        .then(({data}) => {
            setCategorias(data.data);
        })
            .catch((error)=>{
            console.log(error);
        });
    }

    useEffect(()=>{
        getTorrents();
        getUsers();
        getCategorias();
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
                        <h1>Torrents</h1>
                        <Link className="btn-add" to="/torrent/store" >Store</Link>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Titulo</th>
                                <th>Descrição</th>
                                <th>Tamanho</th>
                                <th>Link Magnético</th>
                                <th>Autor</th>
                                <th>Categoria</th>
                                <th className="center actions" colSpan={3}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                torrents.length > 0 ? (
                                torrents.map(torrent =>(
                                    <tr key = {torrent.id}>
                                       
                                        <td>{torrent.id}</td>
                                        <td>{torrent.titulo}</td>
                                        <td>{torrent.descricao}</td>
                                        <td>{torrent.tamanho}</td>
                                        <td>{torrent.link_magnetico}</td>
                                        <td>{users.find(user => user.id === torrent.user_id)?.name || 'Desconhecido'}</td>
                                        <td>{categorias.find(categoria => categoria.id === torrent.categoria_id)?.nome || 'Desconhecido'}</td>
                                        <td className="center actions">
                                            <Link className ="btn-edit" to = {`/torrent/update/${torrent.id}`} >Update</Link>
                                        </td>
                                        <td className="center actions">
                                            <Link className ="btn-delete" to = {`/torrent/destroy/${torrent.id}`} >Destroy</Link>
                                        </td>
                                        <td className="center actions">
                                            <Link className ="btn-show" to ={`/torrent/show/${torrent.id}`} >Show</Link>
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