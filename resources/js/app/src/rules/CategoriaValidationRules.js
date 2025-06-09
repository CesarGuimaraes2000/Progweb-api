import useValidator from "../hook/useValidator";
import { ERRO_CATEGORIA, CATEGORIA } from "../types/Categoria";

const UserValidationRules = {
    nome:(nome)=>{
        let mensagens = [];
        if(!nome || nome.trim().length === 0){
            mensagens.push('Obrigatório informar o nome da Categoria');
        }
        return mensagens;
    },
}

export const useValidarDadosCategoria = () =>{
    return useValidator(CATEGORIA, ERRO_CATEGORIA, UserValidationRules);
}