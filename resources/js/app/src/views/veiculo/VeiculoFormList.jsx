import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import axiosClient from '../../AxiosClient';


export default function VeiculoFormList(){
    const [veiculos, setVeiculos] = useState([]);

    const getVeiculos = () => {
        axiosClient
        .get('/veiculo/index')
        .then(({data}) => {
            setVeiculos(data.data);
        })
            .catch((error)=>{
            console.log(error);
        });
        
    }

    useEffect(()=>{
        getVeiculos();
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
                        <h1>Veiculos</h1>
                        <Link className="btn-add" to="/veiculo/store" >Store</Link>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Placa</th>
                                <th>Modelo</th>
                                <th>Ano</th>
                                <th>Fabricante</th>
                                <th>Usuário</th>
                                <th className="center actions" colSpan={3}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                veiculos.length > 0 ? (
                                veiculos.map(veiculo =>(
                                    <tr key = {veiculo.id}>
                                       
                                        <td>{veiculo.id}</td>
                                        <td>{veiculo.placa}</td>
                                        <td>{veiculo.modelo}</td>
                                        <td>{veiculo.ano}</td>
                                        <td>{veiculo.fabricante}</td>
                                        <td>{veiculo.user_id}</td>
                                        <td className="center actions">
                                            <Link className ="btn-edit" to = {`/veiculo/update/${veiculo.id}`} >Update</Link>
                                        </td>
                                        <td className="center actions">
                                            <Link className ="btn-delete" to = {`/veiculo/destroy/${veiculo.id}`} >Destroy</Link>
                                        </td>
                                        <td className="center actions">
                                            <Link className ="btn-show" to ={`/veiculo/show/${veiculo.id}`} >Show</Link>
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