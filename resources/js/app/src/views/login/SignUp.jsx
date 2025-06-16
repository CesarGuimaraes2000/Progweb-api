import { Fragment} from "react";
import axiosClient from "../../axiosClient";
import { useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';
import { useValidarDadosUserRegistro } from "../../rules/UserRegistroValidationRules";
import Input from "../../components/input/Input";

export default function SignUp(){
    const navigate = useNavigate();
    const { model, error,setModel, formValid, handleChangeField, handleBlurField} = useValidarDadosUserRegistro();

        const onSubmit = (e) =>{
        e.preventDefault();
        if(formValid()){
            axiosClient.post('/user/store', model)
                 .then(()=>{
                    setModel({});
                    console.log("Usuário salvo com sucesso");
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
                    <h1 className="title">Registre Sua Conta</h1>
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
                        <Input 
                            id = "password"
                            type = "password"
                            value={model.password}
                            placeholder="Senha"
                            handleChangeField={handleChangeField}
                            handleBlurField={handleBlurField}
                            error={error.password}
                            mensagem={error.passwordMensagem}
                        />
                        <Input 
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
                    <p className="message">Já Está Registrado?</p>
                    <Link to ="/">Login</Link>
                </div>
            </div>  
        </Fragment>  
    )
}