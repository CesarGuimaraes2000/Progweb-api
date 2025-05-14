import { Fragment, useEffect } from "react";
import axiosClient from '../../AxiosClient';
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function CategoriaFormDestroy(){
    const navigate = useNavigate();
    const [categoria, setCategoria] = useState({
        id: null,
        nome: '',
    });
    const { id } = useParams();
    if(id){
        useEffect(() => {
            axiosClient.get(`/categoria/show/${id}`)
            .then(({data})=>{
             //console.log(data.data);
             setCategoria(data.data);
            })
            .catch((error)=>{
                console.log(error);
            });
        },[id]);
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        axiosClient.delete(`/categoria/destroy/${id}`)
            .then(()=>{
             setCategoria({});
             navigate('/categoria/index');
            })
            .catch((error)=>{
                console.log(error);
            });
    }
    const onCancel = () =>{
        navigate('/categoria/index');
    }
    return(
        <Fragment>
            <div className = "display">
                <div className="card animated fadeinDown">
                    {categoria.id && <h1>Exclusão de Categoria: {categoria.nome}</h1>}
                    <form onSubmit={(e) => onSubmit(e)}>
                        <input defaultValue={categoria.nome} placeholder="Nome da Categoria" readOnly={true}/>
                        <Link type="button" className = "btn btn-cancel"
                            to ="/categoria/index">
                            Cancelar
                        </Link>
                        <button className="btn-delete">Excluir</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}