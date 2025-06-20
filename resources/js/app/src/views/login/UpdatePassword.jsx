import { Fragment, useEffect} from "react";
import axiosClient from "../../axiosClient";
import { useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';
import { useValidarDadosUserRegistro } from "../../rules/UserRegistroValidationRules";
import PasswordInput from "../../components/input/PasswordInput";

export default function UpdatePassword(){

    const navigate = useNavigate();
    const { model, error,setModel, formValid, handleChangeField, handleBlurField} = useValidarDadosUserRegistro();
    const id  = sessionStorage.getItem('Id');

    if(id){
        useEffect(() => {
            axiosClient.get(`/user/show/${id}`)
            .then(({data})=>{
             setModel({
                ...data.data,
                password: "",
            });
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
                sessionStorage.removeItem('Id');
                navigate('/login');
                })
                .catch((error)=>{
                    console.log(error);
                });
        }
    }   
    
    return (
        <Fragment>
            <div className="login-signup-form animated fadeInDown">
                <div className="form">
                    <form onSubmit={(e) => onSubmit(e)}>
                        <h1 className="title">Nova Senha</h1>
                        <PasswordInput 
                            id = "password"
                            type = "password"
                            value={model.password}
                            placeholder="Senha"
                            handleChangeField={handleChangeField}
                            handleBlurField={handleBlurField}
                            error={error.password}
                            mensagem={error.passwordMensagem}
                        />
                        <PasswordInput 
                            id = "confirmPassword"
                            type = "password"
                            value={model.confirmPassword}
                            placeholder="Confirme a Senha"
                            handleChangeField={handleChangeField}
                            handleBlurField={handleBlurField}
                            error={error.confirmPassword}
                            mensagem={error.confirmPasswordMensagem}
                        />
                        <button className="btn btn-block">Salvar</button>
                    </form>
                    <p className="message p-20">Acesso ao sistema</p>
                    <Link to ="/">Login</Link>
                </div>
            </div> 
        </Fragment>  
    )
}