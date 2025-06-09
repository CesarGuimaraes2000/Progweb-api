import { Fragment, useEffect } from "react";
import axiosClient from '../../AxiosClient';
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function FavoritoFormShow(){
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
        navigate('/favorito/index');
    }
    return(
        <Fragment>
            <div className = "display">
                <div className="card animated fadeinDown">
                    {favorito.id && <h1>Consulta de Favorito: {favorito.id}</h1>}
                    <form onSubmit={(e) => onSubmit(e)}>
                        <input defaultValue={users.find(user => user.id === favorito.user_id)?.name} placeholder="Usuário" readOnly={true}/>
                        <input defaultValue={torrents.find(torrent => torrent.id === favorito.torrent_id)?.titulo} placeholder="Torrent" readOnly={true}/>
                        <button className="btn btn-cancel">Cancelar</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}