import { Link } from 'react-router-dom'
export default function UpdatePassword(){
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form>
                    <h1 className="title">Alterar Senha</h1>
                    <input type='password' placeholder="Senha" className = 'p-20'/>
                    <input type='password' placeholder="Confirme a Senha" className = 'p-20'/>
                    <button className="btn btn-block">Salvar</button>
                    <p className="message p-20">Acesso ao sistema</p>
                    <Link to ="/">Login</Link>
                </form>
            </div>
        </div>   
    )
}