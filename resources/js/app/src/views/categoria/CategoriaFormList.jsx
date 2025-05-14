import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import axiosClient from '../../AxiosClient';


export default function CategoriaFormList(){
    const [categorias, setCategorias] = useState([]);
    
    const getCategorias = () => {
        axiosClient
        .get('/categoria/index')
        .then(({data}) => {
            setCategorias(data.data);
        })
            .catch((error)=>{
            console.log(error);
        });
    }

    useEffect(()=>{
        getCategorias();
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
                        <h1>Categorias</h1>
                        <Link className="btn-add" to="/categoria/store" >Store</Link>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th className="center actions" colSpan={3}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categorias.length > 0 ? (
                                categorias.map(categoria =>(
                                    <tr key = {categoria.id}>
                                        <td>{categoria.id}</td>
                                        <td>{categoria.nome}</td>
                                        <td className="center actions">
                                            <Link className ="btn-edit" to = {`/categoria/update/${categoria.id}`} >Update</Link>
                                        </td>
                                        <td className="center actions">
                                            <Link className ="btn-delete" to = {`/categoria/destroy/${categoria.id}`} >Destroy</Link>
                                        </td>
                                        <td className="center actions">
                                            <Link className ="btn-show" to ={`/categoria/show/${categoria.id}`} >Show</Link>
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