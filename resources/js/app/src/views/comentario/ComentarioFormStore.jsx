import { Fragment, useEffect } from "react";
import axiosClient from "../../AxiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function ComentarioFormStore(){
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [torrents, setTorrents] = useState([]);

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

    useEffect(()=>{
            getUsers();
            getTorrents();
        },[]);

    const [comentario, setComentario] = useState({
        id: null,
        mensagem: '',
        user_id: '',
        torrent_id: ''
    });
    
    const onSubmit = (e) =>{
        e.preventDefault();
        axiosClient.post('/comentario/store', comentario)
            .then(()=>{
             setComentario({});
             console.log("Comentario salvo com sucesso");
             navigate('/comentario/index');
            })
            .catch((error)=>{
                console.log(error);
            });
    }
    const onCancel = () =>{
        navigate('/comentario/index');
    }
    return(
        <Fragment>
            <div className = "display">
                <div className="card animated fadeinDown">
                    <h1>Inclusão de Comentario</h1>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <input value={comentario.mensagem} placeholder="Mensagem"
                        onChange={
                            e => setComentario({
                                ...comentario, mensagem:e.target.value
                            })
                        }/>
                        <select
                            value={comentario.user_id}
                            onChange={e => setComentario({ ...comentario, user_id: e.target.value })}
                        >
                            <option value="" disabled hidden>Usuário</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={comentario.torrent_id}
                            onChange={e => setComentario({ ...comentario, torrent_id: e.target.value })}
                        >
                            <option value="" disabled hidden>Torrent</option>
                            {torrents.map(torrent => (
                                <option key={torrent.id} value={torrent.id}>
                                    {torrent.titulo}
                                </option>
                            ))}
                        </select>
                        <Link type="button" className = "btn btn-cancel"
                            to ="/comentario/index">
                            Cancelar
                        </Link>
                        <button className="btn-add">Salvar</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}