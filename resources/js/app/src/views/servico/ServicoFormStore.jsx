import { Fragment, useEffect } from "react";
import axiosClient from "../../AxiosClient";
import { data, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function ServicoFormStore(){
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
    
    const onSubmit = (e) =>{
        e.preventDefault();
        axiosClient.post('/servico/store', servico)
            .then(()=>{
             setServico({});
             console.log("Servico salva com sucesso");
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
                    <h1>Inclusão de Servico</h1>
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
                        <button className="btn-add">Salvar</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}