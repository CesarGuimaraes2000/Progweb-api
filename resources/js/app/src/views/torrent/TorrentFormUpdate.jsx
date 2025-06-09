import { Fragment, useEffect } from "react";
import axiosClient from "../../AxiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function TorrentFormUpdate(){
    const navigate = useNavigate();
    const [torrent, setTorrent] = useState({
        id: null,
        titulo:'',
        descricao: '',
        link_magnetico: '',
        tamanho: '',
        usuario_id: '',
        categoria_id: '',
    });
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
            getUsers();
            getCategorias();
        },[]);

    const { id } = useParams();
    if(id){
        useEffect(() => {
            axiosClient.get(`torrent/show/${id}`)
            .then(({data})=>{
             //console.log(data.data);
             setTorrent(data.data);
            })
            .catch((error)=>{
                console.log(error);
            });
        },[id]);
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        axiosClient.put(`/torrent/update/${id}`, torrent)
            .then(()=>{
             setTorrent({});
             console.log("Torrent Alterado com sucesso");
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
                    {torrent.id && <h1>Alteração de Torrent</h1>}
                    <form onSubmit={(e) => onSubmit(e)}>
                        <input value={torrent.titulo} placeholder="Titulo"
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
                        <input value={torrent.tamanho} placeholder="Tamanho"
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
                        <button className="btn-edit">Atualizar</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}