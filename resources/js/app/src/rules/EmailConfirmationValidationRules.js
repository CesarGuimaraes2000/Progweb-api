import useValidator from "../hook/useValidator";
import { ERRO_EMAIL_CONFIRMATION, EMAIL_CONFIRMATION } from "../types/EmailConfirmation";

const EmailConfirmationValidationRules = {
    codigo:(codigo)=>{
        let mensagens = [];
        if(!codigo || codigo.trim().length === 0){
            mensagens.push('Obrigatório informar o código');
        }
        if(codigo && codigo.length != 7){
            mensagens.push('O código digitado deve conter 7 caracteres');
        }
        return mensagens;
    },
}

export const useValidarDadosEmailConfirmation = () =>{
    return useValidator(EMAIL_CONFIRMATION, ERRO_EMAIL_CONFIRMATION, EmailConfirmationValidationRules);
}