import { Fragment, useEffect } from "react";
import axiosClient from "../../AxiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function GerenciamentoFormStore(){
    const navigate = useNavigate();

    const [gerenciamento, setGerenciamento] = useState({
        id: null,
        funcionario_id: '',
        servico_id: ''
    });
    
    const onSubmit = (e) =>{
        e.preventDefault();
        axiosClient.post('/gerenciamento/store', gerenciamento)
            .then(()=>{
             setGerenciamento({});
             console.log("Gerenciamento salvo com sucesso");
             navigate('/gerenciamento/index');
            })
            .catch((error)=>{
                console.log(error);
            });
    }
    const onCancel = () =>{
        navigate('/gerenciamento/index');
    }
    return(
        <Fragment>
            <div className = "display">
                <div className="card animated fadeinDown">
                    <h1>Inclusão de Gerenciamento</h1>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <input value={gerenciamento.servico_id} placeholder="Servico"
                        onChange={
                            e => setGerenciamento({
                                ...gerenciamento, servico_id:e.target.value
                            })
                        }/>
                        <input value={gerenciamento.funcionario_id} placeholder="Funcionário"
                        onChange={
                            e => setGerenciamento({
                                ...gerenciamento, funcionario_id:e.target.value
                            })
                        }/>
                        <Link type="button" className = "btn btn-cancel"
                            to ="/gerenciamento/index">
                            Cancelar
                        </Link>
                        <button className="btn-add">Salvar</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}