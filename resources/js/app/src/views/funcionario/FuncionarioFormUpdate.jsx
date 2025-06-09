import { Fragment, useEffect } from "react";
import axiosClient from "../../AxiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function FuncionarioFormUpdate(){
    const navigate = useNavigate();
    const [funcionario, setFuncionario] = useState({
        id: null,
        nome: '',
        cargo:'',
        salario:''
    });
    const { id } = useParams();
    if(id){
        useEffect(() => {
            axiosClient.get(`/funcionario/show/${id}`)
            .then(({data})=>{
             //console.log(data.data);
             setFuncionario(data.data);
            })
            .catch((error)=>{
                console.log(error);
            });
        },[id]);
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        axiosClient.put(`/funcionario/update/${id}`, funcionario)
            .then(()=>{
             setFuncionario({});
             console.log("Funcionario alterada com sucesso");
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
                    {funcionario.id && <h1>Alteração de Funcionario</h1>}
                    <form onSubmit={(e) => onSubmit(e)}>
                        <input value={funcionario.nome} placeholder="Nome do Funcionario"
                        onChange={
                            e => setFuncionario({
                                ...funcionario, nome:e.target.value
                            })
                        }/>
                        <input value={funcionario.cargo} placeholder="Cargo do Funcionario"
                        onChange={
                            e => setFuncionario({
                                ...funcionario, cargo:e.target.value
                            })
                        }/>
                        <input value={funcionario.salario} placeholder="Salário da Funcionario"
                        onChange={
                            e => setFuncionario({
                                ...funcionario, salario:e.target.value
                            })
                        }/>
                        <Link type="button" className = "btn btn-cancel"
                            to ="/funcionario/index">
                            Cancelar
                        </Link>
                        <button className="btn-edit">Atualizar</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}