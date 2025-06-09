import { Fragment, useEffect } from "react";
import axiosClient from "../../AxiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function TorrentFormStore(){
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [categorias, setCategorias] = useState([]);

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

    useEffect(()=>{
            getUsers();
            getCategorias();
        },[]);

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

    const [torrent, setTorrent] = useState({
        id: null,
        titulo: '',
        descricao: '',
        tamanho:'',
        link_magnetico: '',
        user_id: '',
        categoria_id: ''
    });
    
    const onSubmit = (e) =>{
        e.preventDefault();
        axiosClient.post('/torrent/store', torrent)
            .then(()=>{
             setTorrent({});
             console.log("Torrent salvo com sucesso");
             navigate('/torrent/index');
            })
            .catch((error)=>{
                console.log(error);
            });
    }
    const onCancel = () =>{
        navigate('/torrent/index');
    }
    return(
        <Fragment>
            <div className = "display">
                <div className="card animated fadeinDown">
                    <h1>Inclusão de Torrent</h1>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <input value={torrent.titulo} placeholder="Título"
                        onChange={
                            e => setTorrent({
                                ...torrent, titulo:e.target.value
                            })
                        }/>
                        <input value={torrent.descricao} placeholder="Descrição"
                        onChange={
                            e => setTorrent({
                                ...torrent, descricao:e.target.value
                            })
                        }/>
                        <input value={torrent.tamanho} placeholder="Tamanho do Arquivo"
                        onChange={
                            e => setTorrent({
                                ...torrent, tamanho:e.target.value
                            })
                        }/>
                        <input value={torrent.link_magnetico} placeholder="Link Magnético"
                        onChange={
                            e => setTorrent({
                                ...torrent, link_magnetico:e.target.value
                            })
                        }/>
                        <select
                            value={torrent.user_id}
                            onChange={e => setTorrent({ ...torrent, user_id: e.target.value })}
                        >
                            <option value="" disabled hidden>Autor</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={torrent.categoria_id}
                            onChange={e => setTorrent({ ...torrent, categoria_id: e.target.value })}
                        >
                            <option value="" disabled hidden>Categoria</option>
                            {categorias.map(categoria => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nome}
                                </option>
                            ))}
                        </select>
                        <Link type="button" className = "btn btn-cancel"
                            to ="/torrent/index">
                            Cancelar
                        </Link>
                        <button className="btn-add">Salvar</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}