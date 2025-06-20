import {createRef, Fragment, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import { useLogin } from '../../context/ContextProvider';
import { useValidarDadosLogin } from '../../rules/LoginValidationRules';
import MensagemErro from '../../components/messages/MensagemErro';
import Input from "../../components/input/Input";
import PasswordInput from "../../components/input/PasswordInput";

export default function Login(){

    const { model, error, formValid, handleChangeField, handleBlurField} = useValidarDadosLogin();

    const navigate = useNavigate();
    const { _setToken, _setUser } = useLogin();

    const [message, setMessage] = useState(null);


    const getInputClass = (error) => {
        if (error){
            return "form-control is-invalid";
        } else if (error===false){
            return "form-control is-valid";
        }
        return "form-control";
    }


    const onSubmit = (e) => {
       e.preventDefault();
       formValid();
       console.log(error)


      const login = {
           email: model.email,
           password: model.password
        }

        axiosClient.post('/login', login)
                   .then(({data})=>{
                     _setToken(data.token);
                     _setUser(data.user);
                     setMessage('login realizado com sucesso '+login);
                     navigate('/dashboard');
                   })
                   .catch((erro)=>{
                     console.log(erro);
                   }) 
    }
    return(
      <Fragment>
        <div className="login-signup-form animated fadeInDown">
          <div className="form">
            <h1 className="title p-20">Acesso ao Sistema</h1>
                  {
                      message &&
                      <div className='alert'>
                      <p>{message}</p>
                      </div>
                  }
              <form onSubmit={(e) => onSubmit(e)}>
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
                  <button type="submit"
                    className='btn btn-block p-20'>Login</button>
                  <p className='message'>Não está Registrado? <Link to="/register">Criar nova conta</Link></p>
                  <p className='message'>Esqueceu Sua Senha? <Link to="/forgotpassword">Recuperar Conta</Link></p>
              </form>

          </div>

        </div>
      </Fragment>

    )

}
