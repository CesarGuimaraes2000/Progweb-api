import { Fragment, useEffect } from "react";
import axiosClient from '../../AxiosClient';
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function ComentarioFormShow(){
    const navigate = useNavigate();
    const [comentario, setComentario] = useState({
        id: null,
        mensagem:'',
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
            axiosClient.get(`comentario/show/${id}`)
            .then(({data})=>{
             //console.log(data.data);
             setComentario(data.data);
            })
            .catch((error)=>{
                console.log(error);
            });
        },[id]);
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        navigate('/comentario/index');
    }
    return(
        <Fragment>
            <div className = "display">
                <div className="card animated fadeinDown">
                    {comentario.id && <h1>Consulta de Comentário: {comentario.id}</h1>}
                    <form onSubmit={(e) => onSubmit(e)}>
                        <input defaultValue={comentario.mensagem} placeholder="Titulo" readOnly={true}/>
                        <input defaultValue={users.find(user => user.id === comentario.user_id)?.name} placeholder="Usuário" readOnly={true}/>
                        <input defaultValue={torrents.find(torrent => torrent.id === comentario.torrent_id)?.titulo} placeholder="Torrent" readOnly={true}/>
                        <button className="btn btn-cancel">Cancelar</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}