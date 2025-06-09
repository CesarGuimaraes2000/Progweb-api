import { Fragment, useEffect } from "react";
import axiosClient from '../../AxiosClient';
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function VeiculoFormDestroy(){
    const navigate = useNavigate();
    const [veiculo, setVeiculo] = useState({
        id: null,
        placa:'',
        modelo: '',
        ano: '',
        fabricante: '',
        usuario_id: '',
    });

    const { id } = useParams();
    if(id){
        useEffect(() => {
            axiosClient.get(`/veiculo/show/${id}`)
            .then(({data})=>{
             //console.log(data.data);
             setVeiculo(data.data);
            })
            .catch((error)=>{
                console.log(error);
            });
        },[id]);
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        axiosClient.delete(`/veiculo/destroy/${id}`)
            .then(()=>{
             setVeiculo({});
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
                    {veiculo.id && <h1>Exclusão de Veiculo: {veiculo.placa}</h1>}
                    <form onSubmit={(e) => onSubmit(e)}>
                        <input defaultValue={veiculo.placa} placeholder="Placa" readOnly={true}/>
                        <input defaultValue={veiculo.modelo} placeholder="Modelo"readOnly={true}/>
                        <input defaultValue={veiculo.ano} placeholder="Ano" readOnly={true}/>
                        <input defaultValue={veiculo.fabricante} placeholder="Fabricante"readOnly={true}/>
                        <input defaultValue={veiculo.user_id} placeholder="Usuário" readOnly={true}/>
                        <Link type="button" className = "btn btn-cancel"
                            to ="/veiculo/index">
                            Cancelar
                        </Link>
                        <button className="btn-delete">Excluir</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}