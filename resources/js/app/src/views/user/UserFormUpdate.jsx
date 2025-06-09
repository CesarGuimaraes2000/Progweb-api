import { Fragment, useEffect } from "react";
import axiosClient from "../../AxiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useValidarDadosUser } from "../../rules/UserValidationRules";
import Input from "../../components/input/Input";

export default function UserFormUpdate(){
    const navigate = useNavigate();

    const { model, error, setModel, formValid, handleChangeField, handleBlurField} = useValidarDadosUser();

    const { id } = useParams();

    if(id){
        useEffect(() => {
            axiosClient.get(`/user/show/${id}`)
            .then(({data})=>{
             setModel(data.data);
            })
            .catch((error)=>{
                console.log(error);
            });
        },[id]);
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        console.log(model);
        if(formValid()){
            axiosClient.put(`/user/update/${id}`, model)
                .then(()=>{
                setModel({});
                console.log("Usuário alterado com sucesso");
                navigate('/user/index');
                })
                .catch((error)=>{
                    console.log(error);
                });
        }
    }
    const onCancel = () =>{
        navigate('/user/index');
    }
    return(
        <Fragment>
            <div className = "display">
                <div className="card animated fadeinDown">
                    {model.id && <h1>Alteração de Usuário</h1>}
                    <form onSubmit={(e) => onSubmit(e)}>
                        <Input 
                            id = "name"
                            type = "text"
                            value={model.name}
                            placeholder="Nome"
                            handleChangeField={handleChangeField}
                            handleBlurField={handleBlurField}
                            error={error.name}
                            mensagem={error.nameMensagem}
                        />
                        <Input 
                            id = "email"
                            type = "text"
                            value={model.email}
                            placeholder="E-mail"
                            handleChangeField={handleChangeField}
                            handleBlurField={handleBlurField}
                            error={error.email}
                            mensagem={error.emailMensagem}
                        />
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