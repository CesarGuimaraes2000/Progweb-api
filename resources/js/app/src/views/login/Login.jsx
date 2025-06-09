import {createRef, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import axiosClient from '../../axiosClient';
import { useLogin } from '../../context/ContextProvider';
import { useValidarDadosLogin } from '../../rules/LoginValidationRules';
import MensagemErro from '../../components/messages/MensagemErro';

export default function Login(){

    const { model, error, formValid, handleChangeField, validateAll } = useValidarDadosLogin();

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


    //    const login = {
    //       email: emailRef.current.value,
    //       password: passwordRef.current.value
    //    }

    //    axiosClient.post('/login', login)
    //               .then(({data})=>{
    //                 _setToken(data.token);
    //                 _setUser(data.user);
    //                 setMessage('login realizado com sucesso '+login);
    //                 navigate('/dashboard');
    //               })
    //               .catch((erro)=>{
    //                 console.log(erro);
    //               })


    }
    return(
      <div className="login-signup-form animated fadeInDown">
        <div className="form">
            <form onSubmit={onSubmit}>
                <h1 className="title p-20">Acesso ao Sistema</h1>
                {
                    message &&
                    <div className='alert'>
                    <p>{message}</p>
                    </div>
                }
                <div className='p-20'>
                    <input type="text"
                           placeholder='E-mail'
                           className={getInputClass(error.email)}
                           name="email"
                           value={model.email}
                           onChange={handleChangeField}
                        />
                        {
                            <MensagemErro
                               error = {error.email}
                               mensagem = {error.emailMensagem}
                            />
                                // <div className='invalid-feedback'> {
                                //     error.emailMensagem.map((mens, index)=> {
                                //         return (
                                //             <p key={index} >
                                //                 <span style={{ margin:"0", color:"red" }}>{mens}</span>
                                //             </p>
                                //         )})}
                                // </div>
                        }
                </div>
                <div className='p-20'>
                   <input type="password"
                          placeholder='Senha'
                          className={getInputClass(error.password)}
                          name="password"
                          value={model.password}
                          onChange={handleChangeField}
                       />
                       {
                         <MensagemErro
                            error = {error.password}
                            mensagem = {error.passwordMensagem}
                         />
                            // <div className='invalid-feedback'> {
                            //     error.passwordMensagem.map((mens, index)=> {
                            //         return (
                            //             <p key={index} >
                            //                 <span style={{ margin:"0", color:"red" }}>{mens}</span>
                            //             </p>
                            //     )})}
                            // </div>
                       }
                </div>
                <button type="submit"
                   className='btn btn-block p-20'>Login</button>
                <p className='message'>Não está Registrado? <Link to="/register">Criar nova conta</Link></p>
            </form>

        </div>

      </div>

    )

}
