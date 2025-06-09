import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import axiosClient from '../../AxiosClient';


export default function GerenciamentoFormList(){
    const [gerenciamentos, setGerenciamentos] = useState([]);

    const getGerenciamentos = () => {
        axiosClient
        .get('/gerenciamento/index')
        .then(({data}) => {
            setGerenciamentos(data.data);
        })
            .catch((error)=>{
            console.log(error);
        });
    }

    useEffect(()=>{
        getGerenciamentos();
    },[]);
    return(
        <div>
            <div className="display">
                <div className = "card animated fadeInDown">
                    <div style={{ 
                        display:'flex',
                        justifyContent:'space-between',
                        alignItems:'center'
                    }}>
                        <h1>Gerenciamentos</h1>
                        <Link className="btn-add" to="/gerenciamento/store" >Store</Link>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Usuário</th>
                                <th>Servico</th>
                                <th className="center actions" colSpan={3}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                gerenciamentos.length > 0 ? (
                                gerenciamentos.map(gerenciamento =>(
                                    <tr key = {gerenciamento.id}>
                                       
                                        <td>{gerenciamento.id}</td>
                                        <td>{gerenciamento.funcionario_id}</td>
                                        <td>{gerenciamento.servico_id}</td>
                                        <td className="center actions">
                                            <Link className ="btn-edit" to = {`/gerenciamento/update/${gerenciamento.id}`} >Update</Link>
                                        </td>
                                        <td className="center actions">
                                            <Link className ="btn-delete" to = {`/gerenciamento/destroy/${gerenciamento.id}`} >Destroy</Link>
                                        </td>
                                        <td className="center actions">
                                            <Link className ="btn-show" to ={`/gerenciamento/show/${gerenciamento.id}`} >Show</Link>
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