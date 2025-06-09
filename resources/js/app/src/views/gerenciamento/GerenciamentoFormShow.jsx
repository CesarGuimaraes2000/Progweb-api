import { Fragment, useEffect } from "react";
import axiosClient from '../../AxiosClient';
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function GerenciamentoFormShow(){
    const navigate = useNavigate();
    const [gerenciamento, setGerenciamento] = useState({
        id: null,
        funcionario_id: '',
        servico_id: '',
    });

    const { id } = useParams();
    if(id){
        useEffect(() => {
            axiosClient.get(`gerenciamento/show/${id}`)
            .then(({data})=>{
             //console.log(data.data);
             setGerenciamento(data.data);
            })
            .catch((error)=>{
                console.log(error);
            });
        },[id]);
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        navigate('/gerenciamento/index');
    }
    return(
        <Fragment>
            <div className = "display">
                <div className="card animated fadeinDown">
                    {gerenciamento.id && <h1>Consulta de Gerenciamento: {gerenciamento.id}</h1>}
                    <form onSubmit={(e) => onSubmit(e)}>
                        <input defaultValue={gerenciamento.funcionario_id} placeholder="Funcionario" readOnly={true}/>
                        <input defaultValue={gerenciamento.servico_id} placeholder="Serviço"readOnly={true}/>
                        <button className="btn btn-cancel">Cancelar</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}