import { Fragment, useEffect } from "react";
import axiosClient from '../../AxiosClient';
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function gerenciamentoFormDestroy(){
    const navigate = useNavigate();
   const [gerenciamento, setGerenciamento] = useState({
        id: null,
        servico_id_id: '',
        funcionario_id_id: '',
    });
    const { id } = useParams();
    if(id){
        useEffect(() => {
            axiosClient.get(`/gerenciamento/show/${id}`)
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
        axiosClient.delete(`/gerenciamento/destroy/${id}`)
            .then(()=>{
             setGerenciamento({});
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
                    {gerenciamento.id && <h1>Exclusão de Gerenciamento: {gerenciamento.id}</h1>}
                    <form onSubmit={(e) => onSubmit(e)}>
                        <input defaultValue={gerenciamento.funcionario_id} placeholder="Funcionario" readOnly={true}/>
                        <input defaultValue={gerenciamento.servico_id} placeholder="Serviço"readOnly={true}/>
                        <Link type="button" className = "btn btn-cancel"
                            to ="/gerenciamento/index">
                            Cancelar
                        </Link>
                        <button className="btn-delete">Excluir</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}