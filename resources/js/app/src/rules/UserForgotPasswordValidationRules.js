import useValidator from "../hook/useValidator";
import { ERRO_USER_FORGOT_PASSWORD, USER_FORGOT_PASSWORD } from "../types/UserForgotPassword";

const UserForgotPasswordValidationRules = {
    email:(email)=>{
        let mensagens = [];
        if(!email || email.trim().length === 0){
            mensagens.push('Obrigatório informar um e-mail');
        }
        return mensagens;
    },
}

export const useValidarDadosUserForgotPassword = () =>{
    return useValidator(USER_FORGOT_PASSWORD, ERRO_USER_FORGOT_PASSWORD, UserForgotPasswordValidationRules);
}