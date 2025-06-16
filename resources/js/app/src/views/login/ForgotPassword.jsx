import { Fragment} from "react";
import axiosClient from "../../axiosClient";
import { useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';
import { useValidarDadosUserForgotPassword} from "../../rules/UserForgotPasswordValidationRules";
import Input from "../../components/input/Input";

export default function ForgotPassword(){
    const navigate = useNavigate();
    const { model, error,setModel, formValid, handleChangeField, handleBlurField} = useValidarDadosUserForgotPassword();

        const onSubmit = (e) =>{
        e.preventDefault();
        if(formValid()){
            axiosClient.post('/recover', model , {
                headers: {
                    'Content-Type': 'application/json'
                }
                })
                 .then(({data})=>{
                    console.log(data);
                    console.log("Usuário encontrado com sucesso");
                    sessionStorage.setItem('Id', data.data.id);
                    navigate('/emailconfirmation');
                })
                .catch((error)=>{
                    console.log(error);
                });
        }
    }    

    return(
        <Fragment>
            <div className="login-signup-form animated fadeInDown">
                <div className="form">
                    <form onSubmit={(e) => onSubmit(e)}>
                        <h1 className="title">Recuperar senha</h1>
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
                        <button className="btn btn-block">Recuperar</button>
                    </form>
                    <p className="message">Já Está Registrado?</p>
                    <Link to ="/">Login</Link>
                </div>
            </div>   
        </Fragment>
    )
}