import { Fragment, useEffect } from "react";
import axiosClient from "../AxiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function UserFormStore(){
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password:'',
    });
    
    const onSubmit = (e) =>{
        e.preventDefault();
        axiosClient.post('/user/store', user)
            .then(()=>{
             setUser({});
             console.log("Usuário salvo com sucesso");
             navigate('/user/index');
            })
            .catch((error)=>{
                console.log(error);
            });
    }
    const onCancel = () =>{
        navigate('/user/index');
    }
    return(
        <Fragment>
            <div className = "display">
                <div className="card animated fadeinDown">
                    <h1>Inclusão de Usuário</h1>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <input value={user.name} placeholder="Nome"
                        onChange={
                            e => setUser({
                                ...user, name:e.target.value
                            })
                        }/>
                        <input value={user.email} placeholder="Email"
                        onChange={
                            e => setUser({
                                ...user, email:e.target.value
                            })
                        }/>
                        <input 
                        type = "password"
                        value={user.password} placeholder="Senha"
                        onChange={
                            e => setUser({
                                ...user, password:e.target.value
                            })
                        }/>
                        <Link type="button" className = "btn btn-cancel"
                            to ="/user/index">
                            Cancelar
                        </Link>
                        <button className="btn-add">Salvar</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}