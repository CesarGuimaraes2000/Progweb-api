import { Fragment, useEffect } from "react";
import axiosClient from "../../AxiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function FavoritoFormUpdate(){
    const navigate = useNavigate();
    const [favorito, setFavorito] = useState({
        id: null,
        usuario_id: '',
        torrent_id: '',
    });
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

    const { id } = useParams();
    if(id){
        useEffect(() => {
            axiosClient.get(`favorito/show/${id}`)
            .then(({data})=>{
             //console.log(data.data);
             setFavorito(data.data);
            })
            .catch((error)=>{
                console.log(error);
            });
        },[id]);
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        axiosClient.put(`/favorito/update/${id}`, favorito)
            .then(()=>{
             setFavorito({});
             console.log("Comentário Alterado com sucesso");
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
                    {favorito.id && <h1>Alteração de Favorito</h1>}
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
                        <button className="btn-edit">Atualizar</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}