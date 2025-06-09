import { Fragment, useEffect } from "react";
import axiosClient from '../../AxiosClient';
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function TorrentFormShow(){
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
        navigate('/torrent/index');
    }
    return(
        <Fragment>
            <div className = "display">
                <div className="card animated fadeinDown">
                    {torrent.id && <h1>Consulta de Torrent: {torrent.titulo}</h1>}
                    <form onSubmit={(e) => onSubmit(e)}>
                        <input defaultValue={torrent.titulo} placeholder="Titulo" readOnly={true}/>
                        <input defaultValue={torrent.descricao} placeholder="Descrição" readOnly={true}/>
                        <input defaultValue={torrent.tamanho} placeholder="Tamanho" readOnly={true}/>
                        <input defaultValue={torrent.link_magnetico} placeholder="Link Magnético" readOnly={true}/>
                        <input defaultValue={users.find(user => user.id === torrent.user_id)?.name} placeholder="Autor" readOnly={true}/>
                        <input defaultValue={categorias.find(categoria => categoria.id === torrent.categoria_id)?.nome} placeholder="Categoria" readOnly={true}/>
                        <button className="btn btn-cancel">Cancelar</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}