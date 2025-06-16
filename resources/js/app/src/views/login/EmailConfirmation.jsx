import { Fragment, useEffect,useState} from "react";
import axiosClient from "../../axiosClient";
import { useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';
import { useValidarDadosEmailConfirmation} from "../../rules/EmailConfirmationValidationRules";
import Input from "../../components/input/Input";

export default function UpdatePassword(){
    const codigo = null;
    const navigate = useNavigate();
    const { model, error,setModel, formValid, handleChangeField, handleBlurField} = useValidarDadosEmailConfirmation();
    const id  = sessionStorage.getItem('Id');
    const [ConfirmationKey] = useState(() =>
        Math.floor(Math.random() * (9999999 - 1000000)) + 1000000
    );
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

    useEffect(() => {
        if(model.name && model.email){
            axiosClient.post('/sendConfirmationMail',{
                name: model.name,
                codigo: ConfirmationKey,
                email:model.email
            })
            .then(()=>{
                console.log("Email enviado com sucesso");
            })
            .catch((error) =>{
                console.log(error);
            });
        }
        }, [model.name, model.email, ConfirmationKey]);
    const onSubmit = (e) =>{
        e.preventDefault();
        if(model.codigo === String(ConfirmationKey)){
            setModel({});
            console.log("Usuário confirmado");
            navigate('/updatepassword');
        }
    }   
    
    return (
        <Fragment>
            <div className="login-signup-form animated fadeInDown">
                <div className="form">
                    <p className="message p-20">Um código de confirmação foi enviado para {model.email}, por favor digite o código para confirmar sua identidade</p>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <h1 className="title">Digite o código</h1>
                        <Input 
                            id = "codigo"
                            type = "text"
                            value={model.codigo}
                            placeholder="Código"
                            handleChangeField={handleChangeField}
                            handleBlurField={handleBlurField}
                            error={error.codigo}
                            mensagem={error.codigoMensagem}
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