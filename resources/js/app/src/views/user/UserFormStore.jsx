import { Fragment} from "react";
import axiosClient from "../../AxiosClient";
import { useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';
import { useValidarDadosUser } from "../../rules/UserValidationRules";
import Input from "../../components/input/Input";

export default function UserFormStore(){
    const navigate = useNavigate();

    const { model, error,setModel, formValid, handleChangeField, handleBlurField} = useValidarDadosUser();

    const onSubmit = (e) =>{
        e.preventDefault();
        if(formValid()){
            axiosClient.post('/user/store', model)
                 .then(()=>{
                    setModel({});
                    console.log("Usuário salvo com sucesso");
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
                    <h1>Inclusão de Usuário</h1>
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
                        <Link type="button" className = "btn btn-cancel"
                            to ="/user/index">
                            Cancelar
                        </Link>
                        <button className="btn-add">Salvar</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}