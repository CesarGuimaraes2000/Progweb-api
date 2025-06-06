import useValidator from "../hook/useValidator";
import { ERRO_LOGIN, LOGIN } from "../types/Login";

const NUMBER = '0123456789';
const UPPERCASE = 'QWERTYUIOPASDFGHJKLZXCVBNMÇ';
const LOWERCASE = 'qwertyuiopasdfghjklzxcvbnmç';
const SPECIALCHARACTER = '!@#$%¨&*()_-+=§´`[{ªº]}~^;:.>,<\|/?°';
const PASSWORD_LENGTH = 8;
const LoginValidationRules = {

    email:(email)=>{
        let mensagens = [];
        if(!email || email.trim().length === 0){
            mensagens.push('Obrigatório informar um e-mail');
        }
        return mensagens;
    },

    password:(password)=>{
        let mensagens = [];
        if(!password || password.trim().length === 0){
            mensagens.push('Obrigatório informar uma senha');
        }
        if(password && password.length < PASSWORD_LENGTH){
            mensagens.push('A senha deve conter no mínimo 6 catacteres');
        }
        /*
        const hasNumber = [...password].some((char)=>{
            NUMBER.includes(char);
        });

        if(!hasNumber){
            mensagens.push('A senha deve conter pelo menos um número'); 
        }

        const hasLowerCase= [...password].some((char)=>{
            LOWERCASE.includes(char);
        });

        if(!hasLowerCase){
        mensagens.push('A senha deve conter pelo menos uma letra minúscula'); 
        }
        */
        return mensagens;
    },
}

export const useValidarDadosLogin = () =>{
    return useValidator(LOGIN, ERRO_LOGIN, LoginValidationRules);
}