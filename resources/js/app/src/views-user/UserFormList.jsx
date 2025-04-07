import React, { useEffect, useState } from 'react';
import axiosClient from '../AxiosClient';
import { Link } from 'react-router-dom';


export default function UserFormList(){
    const [users, setUsers] = useState([]);
    
    const getUsers = () => {
        axiosClient
        .get('/user/index')
        .then(({data}) => {
            setUsers(data.data);
        })
            .catch((error)=>{
            console.log(error);
        });
    }

    useEffect(()=>{
        getUsers();
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
                        <h1>Usuários</h1>
                        <Link className="btn-add" to="/user/store" >Store</Link>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>EMail</th>
                                <th className="center actions" colSpan={3}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.length > 0 ? (
                                users.map(user =>(
                                    <tr key = {user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td className="center actions">
                                            <Link className ="btn-edit" to ="/user/update" >Update</Link>
                                        </td>
                                        <td className="center actions">
                                            <Link className ="btn-delete" to ="/user/destroy" >Destroy</Link>
                                        </td>
                                        <td className="center actions">
                                            <Link className ="btn-show" to ="/user/show" >Show</Link>
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