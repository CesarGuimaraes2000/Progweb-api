import { Fragment, useEffect } from "react";
import axiosClient from "../../AxiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function FuncionarioFormStore(){
    const navigate = useNavigate();
    const [funcionario, setFuncionario] = useState({
        id: null,
        nome: '',
        cargo:'',
        salario:''
    });
    
    const onSubmit = (e) =>{
        e.preventDefault();
        axiosClient.post('/funcionario/store', funcionario)
            .then(()=>{
             setFuncionario({});
             console.log("Funcionario salva com sucesso");
             navigate('/funcionario/index');
            })
            .catch((error)=>{
                console.log(error);
            });
    }
    const onCancel = () =>{
        navigate('/funcionario/index');
    }
    return(
        <Fragment>
            <div className = "display">
                <div className="card animated fadeinDown">
                    <h1>Inclusão de Funcionario</h1>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <input value={funcionario.nome} placeholder="Nome"
                        onChange={
                            e => setFuncionario({
                                ...funcionario, nome:e.target.value
                            })
                        }/>
                        <input value={funcionario.cargo} placeholder="Cargo"
                        onChange={
                            e => setFuncionario({
                                ...funcionario, cargo:e.target.value
                            })
                        }/>
                        <input value={funcionario.salario} placeholder="Salário"
                        onChange={
                            e => setFuncionario({
                                ...funcionario, salario:e.target.value
                            })
                        }/>
                        <Link type="button" className = "btn btn-cancel"
                            to ="/funcionario/index">
                            Cancelar
                        </Link>
                        <button className="btn-add">Salvar</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}