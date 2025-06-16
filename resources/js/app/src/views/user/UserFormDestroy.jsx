import { Fragment, useEffect } from "react";
import axiosClient from '../../axiosClient';
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function UserFormDestroy(){
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
    });
    const { id } = useParams();
    if(id){
        useEffect(() => {
            axiosClient.get(`/user/show/${id}`)
            .then(({data})=>{
             //console.log(data.data);
             setUser(data.data);
            })
            .catch((error)=>{
                console.log(error);
            });
        },[id]);
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        axiosClient.delete(`/user/destroy/${id}`)
            .then(()=>{
             setUser({});
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
                    {user.id && <h1>Exclusão de Usuário: {user.name}</h1>}
                    <form onSubmit={(e) => onSubmit(e)}>
                        <input defaultValue={user.name} placeholder="Nome do Usuário" readOnly={true}/>
                        <input defaultValue={user.email} placeholder="Email do Usuário"readOnly={true}/>
                        <Link type="button" className = "btn btn-cancel"
                            to ="/user/index">
                            Cancelar
                        </Link>
                        <button className="btn-delete">Excluir</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}