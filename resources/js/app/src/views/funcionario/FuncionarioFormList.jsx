import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import axiosClient from '../../AxiosClient';


export default function FuncionarioFormList(){
    const [funcionarios, setFuncionarios] = useState([]);
    
    const getFuncionarios = () => {
        axiosClient
        .get('/funcionario/index')
        .then(({data}) => {
            setFuncionarios(data.data);
        })
            .catch((error)=>{
            console.log(error);
        });
    }

    useEffect(()=>{
        getFuncionarios();
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
                        <h1>Funcionarios</h1>
                        <Link className="btn-add" to="/funcionario/store" >Store</Link>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Cargo</th>
                                <th>Salário</th>
                                <th className="center actions" colSpan={3}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                funcionarios.length > 0 ? (
                                funcionarios.map(funcionario =>(
                                    <tr key = {funcionario.id}>
                                        <td>{funcionario.id}</td>
                                        <td>{funcionario.nome}</td>
                                        <td>{funcionario.cargo}</td>
                                        <td>{funcionario.salario}</td>
                                        <td className="center actions">
                                            <Link className ="btn-edit" to = {`/funcionario/update/${funcionario.id}`} >Update</Link>
                                        </td>
                                        <td className="center actions">
                                            <Link className ="btn-delete" to = {`/funcionario/destroy/${funcionario.id}`} >Destroy</Link>
                                        </td>
                                        <td className="center actions">
                                            <Link className ="btn-show" to ={`/funcionario/show/${funcionario.id}`} >Show</Link>
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