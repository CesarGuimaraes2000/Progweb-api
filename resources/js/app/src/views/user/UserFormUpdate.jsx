import { Fragment, useEffect } from "react";
import axiosClient from "../../AxiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function UserFormUpdate(){
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
        axiosClient.put(`/user/update/${id}`, user)
            .then(()=>{
             setUser({});
             console.log("Usuário alterado com sucesso");
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
                    {user.id && <h1>Alteração de Usuário</h1>}
                    <form onSubmit={(e) => onSubmit(e)}>
                        <input value={user.name} placeholder="Nome do Usuário"
                        onChange={
                            e => setUser({
                                ...user, name:e.target.value
                            })
                        }/>
                        <input value={user.email} placeholder="Email do Usuário"
                        onChange={
                            e => setUser({
                                ...user, email:e.target.value
                            })
                        }/>
                        <Link type="button" className = "btn btn-cancel"
                            to ="/user/index">
                            Cancelar
                        </Link>
                        <button className="btn-edit">Atualizar</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}