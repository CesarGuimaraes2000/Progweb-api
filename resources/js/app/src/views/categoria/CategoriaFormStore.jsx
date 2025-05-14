import { Fragment, useEffect } from "react";
import axiosClient from "../../AxiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function CategoriaFormStore(){
    const navigate = useNavigate();
    const [categoria, setCategoria] = useState({
        id: null,
        nome: '',
    });
    
    const onSubmit = (e) =>{
        e.preventDefault();
        axiosClient.post('/categoria/store', categoria)
            .then(()=>{
             setCategoria({});
             console.log("Categoria salva com sucesso");
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
                    <h1>Inclusão de Categoria</h1>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <input value={categoria.nome} placeholder="Nome"
                        onChange={
                            e => setCategoria({
                                ...categoria, nome:e.target.value
                            })
                        }/>
                        <Link type="button" className = "btn btn-cancel"
                            to ="/user/index">
                            Cancelar
                        </Link>
                        <button className="btn-add">Salvar</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}