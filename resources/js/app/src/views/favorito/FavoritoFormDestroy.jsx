import { Fragment, useEffect } from "react";
import axiosClient from '../../AxiosClient';
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function favoritoFormDestroy(){
    const navigate = useNavigate();
    const [favorito, setfavorito] = useState({
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
            axiosClient.get(`/favorito/show/${id}`)
            .then(({data})=>{
             //console.log(data.data);
             setfavorito(data.data);
            })
            .catch((error)=>{
                console.log(error);
            });
        },[id]);
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        axiosClient.delete(`/favorito/destroy/${id}`)
            .then(()=>{
             setfavorito({});
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
                    {favorito.id && <h1>Exclusão de Favorito: {favorito.id}</h1>}
                    <form onSubmit={(e) => onSubmit(e)}>
                        <input defaultValue={users.find(user => user.id === favorito.user_id)?.name} placeholder="Autor" readOnly={true}/>
                        <input defaultValue={torrents.find(torrent => torrent.id === favorito.torrent_id)?.titulo} placeholder="Categoria"readOnly={true}/>
                        <Link type="button" className = "btn btn-cancel"
                            to ="/favorito/index">
                            Cancelar
                        </Link>
                        <button className="btn-delete">Excluir</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}