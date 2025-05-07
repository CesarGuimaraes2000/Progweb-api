import { useState } from "react"
import { Link } from 'react-router-dom'

export default function Login(){
    
    const [message, setMessage] = useState(null);

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form>
                    <h1 className="title p-20">Acesso ao sistema com sua conta</h1>
                    {
                        message &&
                        <div className="alert">
                            <p>{message}</p>
                        </div>
                    }
                    <input type='text' placeholder="email" className = 'p-20'/>
                    <input type='password' placeholder="senha" className = 'p-20'/>
                    <button className="btn btn-block">Login</button>
                    <p className="message">Não está Registrado?</p>
                    <Link to ="/register">Criar nova conta</Link>
                    <p className="message">Esqueceu a senha?</p>
                    <Link to ="/forgotpassword">Recuperar Senha</Link>
                </form>
            </div>
        </div>    
    )
}