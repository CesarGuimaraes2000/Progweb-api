import { Fragment, useEffect } from "react";
import axiosClient from "../../AxiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function ComentarioFormUpdate(){
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
        axiosClient.put(`/comentario/update/${id}`, comentario)
            .then(()=>{
             setComentario({});
             console.log("Comentário Alterado com sucesso");
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
                    {comentario.id && <h1>Alteração de Comentário</h1>}
                    <form onSubmit={(e) => onSubmit(e)}>
                        <input value={comentario.mensagem} placeholder="Mensagem"
                        onChange={
                            e => setComentario({
                                ...comentario, mensagem:e.target.value
                            })
                        }/>
                        <Link type="button" className = "btn btn-cancel"
                            to ="/comentario/index">
                            Cancelar
                        </Link>
                        <button className="btn-edit">Atualizar</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}