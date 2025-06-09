import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import axiosClient from '../../AxiosClient';


export default function ServicoFormList(){
    const [servicos, setServicos] = useState([]);
    
    const getServicos = () => {
        axiosClient
        .get('/servico/index')
        .then(({data}) => {
            setServicos(data.data);
        })
            .catch((error)=>{
            console.log(error);
        });
    }

    useEffect(()=>{
        getServicos();
    },[]);
    
    //console.log(users);
    return(
        <div>
            <div className="display">
                <div className = "card animated fadeInDown">
                    <div style={{ 
                        display:'flex',
                        justifyContent:'space-between',
                        alignItems:'center'
                    }}>
                        <h1>Servicos</h1>
                        <Link className="btn-add" to="/servico/store" >Store</Link>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Data de Abertura</th>
                                <th>Data de Conclusão</th>
                                <th>Descrição</th>
                                <th>Status</th>
                                <th>Valor</th>
                                <th>Veículo</th>
                                <th className="center actions" colSpan={3}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                servicos.length > 0 ? (
                                servicos.map(servico =>(
                                    <tr key = {servico.id}>
                                        <td>{servico.id}</td>
                                        <td>{servico.data_abertura}</td>
                                        <td>{servico.data_conclusao}</td>
                                        <td>{servico.descricao}</td>
                                        <td>{servico.status}</td>
                                        <td>{servico.valor}</td>
                                        <td>{servico.veiculo_id}</td>
                                        <td className="center actions">
                                            <Link className ="btn-edit" to = {`/servico/update/${servico.id}`} >Update</Link>
                                        </td>
                                        <td className="center actions">
                                            <Link className ="btn-delete" to = {`/servico/destroy/${servico.id}`} >Destroy</Link>
                                        </td>
                                        <td className="center actions">
                                            <Link className ="btn-show" to ={`/servico/show/${servico.id}`} >Show</Link>
                                        </td>
                                    </tr>
                                ))
                                ):(
                                    <tr>
                                        <td>Nenhum Registro Localizado</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}