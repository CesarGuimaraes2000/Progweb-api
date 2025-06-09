import { Fragment, useEffect } from "react";
import axiosClient from '../../AxiosClient';
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function ComentarioFormDestroy(){
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
            axiosClient.get(`/comentario/show/${id}`)
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
        axiosClient.delete(`/comentario/destroy/${id}`)
            .then(()=>{
             setComentario({});
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
                    {comentario.id && <h1>Exclusão de Comentário: {comentario.id}</h1>}
                    <form onSubmit={(e) => onSubmit(e)}>
                        <input defaultValue={comentario.mensagem} placeholder="Mensagem" readOnly={true}/>
                        <input defaultValue={users.find(user => user.id === comentario.user_id)?.name} placeholder="Autor" readOnly={true}/>
                        <input defaultValue={torrents.find(torrent => torrent.id === comentario.torrent_id)?.titulo} placeholder="Categoria"readOnly={true}/>
                        <Link type="button" className = "btn btn-cancel"
                            to ="/comentario/index">
                            Cancelar
                        </Link>
                        <button className="btn-delete">Excluir</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}