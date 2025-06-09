import { Fragment, useEffect } from "react";
import axiosClient from "../../AxiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function FavoritoFormStore(){
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

    const [favorito, setFavorito] = useState({
        id: null,
        user_id: '',
        torrent_id: ''
    });
    
    const onSubmit = (e) =>{
        e.preventDefault();
        axiosClient.post('/favorito/store', favorito)
            .then(()=>{
             setFavorito({});
             console.log("Favorito salvo com sucesso");
             navigate('/favorito/index');
            })
            .catch((error)=>{
                console.log(error);
            });
    }
    const onCancel = () =>{
        navigate('/favorito/index');
    }
    return(
        <Fragment>
            <div className = "display">
                <div className="card animated fadeinDown">
                    <h1>Inclusão de Favorito</h1>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <select
                            value={favorito.user_id}
                            onChange={e => setFavorito({ ...favorito, user_id: e.target.value })}
                        >
                            <option value="" disabled hidden>Usuário</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={favorito.torrent_id}
                            onChange={e => setFavorito({ ...favorito, torrent_id: e.target.value })}
                        >
                            <option value="" disabled hidden>Torrent</option>
                            {torrents.map(torrent => (
                                <option key={torrent.id} value={torrent.id}>
                                    {torrent.titulo}
                                </option>
                            ))}
                        </select>
                        <Link type="button" className = "btn btn-cancel"
                            to ="/favorito/index">
                            Cancelar
                        </Link>
                        <button className="btn-add">Salvar</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}