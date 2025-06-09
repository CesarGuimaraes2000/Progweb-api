import { Fragment, useEffect } from "react";
import axiosClient from '../../AxiosClient';
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function FuncionarioFormShow(){
    const navigate = useNavigate();
    const [funcionario, setFuncionario] = useState({
        id: null,
        nome: '',
        cargo:'',
        salario:'',
    });
    const { id } = useParams();
    if(id){
        useEffect(() => {
            axiosClient.get(`funcionario/show/${id}`)
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
        navigate('/funcionario/index');
    }
    return(
        <Fragment>
            <div className = "display">
                <div className="card animated fadeinDown">
                    {funcionario.id && <h1>Consulta de Funcionario: {funcionario.nome}</h1>}
                    <form onSubmit={(e) => onSubmit(e)}>
                        <input defaultValue={funcionario.nome} placeholder="Nome do Funcionario" readOnly={true}/>
                        <input defaultValue={funcionario.cargo} placeholder="Cargo do Funcionario" readOnly={true}/>
                        <input defaultValue={funcionario.salario} placeholder="Salário do Funcionario" readOnly={true}/>
                        
                        <button className="btn btn-cancel">Cancelar</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}