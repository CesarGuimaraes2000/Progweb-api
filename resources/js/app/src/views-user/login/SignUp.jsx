import { Link } from 'react-router-dom'

export default function SignUp(){

    

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form>
                    <h1 className="title">Registre Sua Conta</h1>
                    <input type='text' placeholder="Nome"/>
                    <input type='text' placeholder="E-mail"/>
                    <input type='password' placeholder="Senha"/>
                    <input type='password' placeholder="Confirme a Senha"/>
                    <button className="btn btn-block">Salvar</button>
                    <p className="message">Está Registrado?</p>
                    <Link to ="/">Login</Link>
                </form>
            </div>
        </div>    
    )
}