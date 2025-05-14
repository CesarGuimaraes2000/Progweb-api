import { Fragment, useEffect } from "react";
import axiosClient from "../../AxiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function CategoriaFormUpdate(){
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
        axiosClient.put(`/categoria/update/${id}`, categoria)
            .then(()=>{
             setCategoria({});
             console.log("Categoria alterada com sucesso");
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
                    {categoria.id && <h1>Alteração de Categoria</h1>}
                    <form onSubmit={(e) => onSubmit(e)}>
                        <input value={categoria.nome} placeholder="Nome da Categoria"
                        onChange={
                            e => setCategoria({
                                ...categoria, nome:e.target.value
                            })
                        }/>
                        <Link type="button" className = "btn btn-cancel"
                            to ="/categoria/index">
                            Cancelar
                        </Link>
                        <button className="btn-edit">Atualizar</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}