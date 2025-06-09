import { Fragment, useEffect } from "react";
import axiosClient from "../../AxiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function ServicoFormUpdate(){
    const navigate = useNavigate();
    const [servico, setServico] = useState({
        id: null,
        nome: '',
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
        axiosClient.put(`/servico/update/${id}`, servico)
            .then(()=>{
             setServico({});
             console.log("Servico alterada com sucesso");
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
                    {servico.id && <h1>Alteração de Servico</h1>}
                    <form onSubmit={(e) => onSubmit(e)}>
                        <input value={servico.data_abertura} placeholder="Data de Abertura"
                        onChange={
                            e => setServico({
                                ...servico, data_abertura:e.target.value
                            })
                        }/>
                        <input value={servico.data_conclusao} placeholder="Data de Conclusão"
                        onChange={
                            e => setServico({
                                ...servico, data_conclusao:e.target.value
                            })
                        }/>
                        <input value={servico.descricao} placeholder="Descrição"
                        onChange={
                            e => setServico({
                                ...servico, descricao:e.target.value
                            })
                        }/>
                        <input value={servico.status} placeholder="Status"
                        onChange={
                            e => setServico({
                                ...servico, status:e.target.value
                            })
                        }/>
                        <input value={servico.valor} placeholder="Valor"
                        onChange={
                            e => setServico({
                                ...servico, valor:e.target.value
                            })
                        }/>
                        <input value={servico.veiculo_id} placeholder="Veículo"
                        onChange={
                            e => setServico({
                                ...servico, veiculo_id:e.target.value
                            })
                        }/>
                        <Link type="button" className = "btn btn-cancel"
                            to ="/servico/index">
                            Cancelar
                        </Link>
                        <button className="btn-edit">Atualizar</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}