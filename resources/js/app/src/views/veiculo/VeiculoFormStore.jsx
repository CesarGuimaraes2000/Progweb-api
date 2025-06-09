import { Fragment, useEffect } from "react";
import axiosClient from "../../AxiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function VeiculoFormStore(){
    const navigate = useNavigate();
  
    const [veiculo, setVeiculo] = useState({
        id: null,
        placa: '',
        modelo: '',
        ano:'',
        fabricante: '',
        user_id: '',
    });
    
    const onSubmit = (e) =>{
        e.preventDefault();
        axiosClient.post('/veiculo/store', veiculo)
            .then(()=>{
             setVeiculo({});
             console.log("Veiculo salvo com sucesso");
             navigate('/veiculo/index');
            })
            .catch((error)=>{
                console.log(error);
            });
    }
    const onCancel = () =>{
        navigate('/veiculo/index');
    }
    return(
        <Fragment>
            <div className = "display">
                <div className="card animated fadeinDown">
                    <h1>Inclusão de Veiculo</h1>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <input value={veiculo.placa} placeholder="Placa"
                        onChange={
                            e => setVeiculo({
                                ...veiculo, placa:e.target.value
                            })
                        }/>
                        <input value={veiculo.modelo} placeholder="Modelo"
                        onChange={
                            e => setVeiculo({
                                ...veiculo, modelo:e.target.value
                            })
                        }/>
                        <input value={veiculo.ano} placeholder="Ano"
                        onChange={
                            e => setVeiculo({
                                ...veiculo, ano:e.target.value
                            })
                        }/>
                        <input value={veiculo.fabricante} placeholder="Fabricante"
                        onChange={
                            e => setVeiculo({
                                ...veiculo, fabricante:e.target.value
                            })
                        }/>
                        <input value={veiculo.user_id} placeholder="Usuário"
                        onChange={
                            e => setVeiculo({
                                ...veiculo, user_id:e.target.value
                            })
                        }/>
                        <Link type="button" className = "btn btn-cancel"
                            to ="/veiculo/index">
                            Cancelar
                        </Link>
                        <button className="btn-add">Salvar</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}