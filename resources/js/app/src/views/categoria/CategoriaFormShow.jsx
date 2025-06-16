import { Fragment, useEffect } from "react";
import axiosClient from '../../axiosClient';
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function CategoriaFormShow(){
    const navigate = useNavigate();
    const [categoria, setCategoria] = useState({
        id: null,
        nome: '',
    });
    const { id } = useParams();
    if(id){
        useEffect(() => {
            axiosClient.get(`categoria/show/${id}`)
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
        navigate('/categoria/index');
    }
    return(
        <Fragment>
            <div className = "display">
                <div className="card animated fadeinDown">
                    {categoria.id && <h1>Consulta de Categoria: {categoria.nome}</h1>}
                    <form onSubmit={(e) => onSubmit(e)}>
                        <input defaultValue={categoria.nome} placeholder="Nome da Categoria" readOnly={true}/>
                        <button className="btn btn-cancel">Cancelar</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}