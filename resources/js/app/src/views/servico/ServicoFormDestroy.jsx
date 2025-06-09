import { Fragment, useEffect } from "react";
import axiosClient from '../../AxiosClient';
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function ServicoFormDestroy(){
    const navigate = useNavigate();
    const [servico, setServico] = useState({
        id: null,
        data_abertura: '',
        data_conclusao:'',
        descricao:'',
        status:'',
        valor:'',
        veiculo_id:''
    });
    const { id } = useParams();
    if(id){
        useEffect(() => {
            axiosClient.get(`/servico/show/${id}`)
            .then(({data})=>{
             //console.log(data.data);
             setServico(data.data);
            })
            .catch((error)=>{
                console.log(error);
            });
        },[id]);
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        axiosClient.delete(`/servico/destroy/${id}`)
            .then(()=>{
             setServico({});
             navigate('/servico/index');
            })
            .catch((error)=>{
                console.log(error);
            });
    }
    const onCancel = () =>{
        navigate('/servico/index');
    }
    return(
        <Fragment>
            <div className = "display">
                <div className="card animated fadeinDown">
                    {servico.id && <h1>Exclusão de Servico: {servico.id}</h1>}
                    <form onSubmit={(e) => onSubmit(e)}>
                        <input defaultValue={servico.data_abertura} placeholder="Data de Abertura" readOnly={true}/>
                        <input defaultValue={servico.data_conclusao} placeholder="Data de Conclusão" readOnly={true}/>
                        <input defaultValue={servico.descricao} placeholder="Descrição" readOnly={true}/>
                        <input defaultValue={servico.status} placeholder="Status" readOnly={true}/>
                        <input defaultValue={servico.valor} placeholder="Valor" readOnly={true}/>
                        <input defaultValue={servico.veiculo_id} placeholder="Veículo" readOnly={true}/>
                        <Link type="button" className = "btn btn-cancel"
                            to ="/servico/index">
                            Cancelar
                        </Link>
                        <button className="btn-delete">Excluir</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}