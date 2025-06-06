
import {useState} from 'react';

const useValidator = (initialModel, errorModel, validationRules) =>{

    const [model, setModel] = useState(initialModel);
    const [error, setError] = useState(errorModel);

    const handleChangeField = ( e ) => {
        const { name, value } = e.target;
        setModel( (prev) => ({
           ...prev, [name]: value
        }));
    }

    const hasErrors = (erros) => {
        return Object.values(erros).some(value => value === true);
    }


    const validateAll = () => {
        let erros = {};
        Object.keys(validationRules).forEach((field) => {
            const validationFunction = validationRules[field];
            const value = model[field];
            const mensagens = validationFunction(value,model);
            erros[`${field}Mensagem`] = mensagens;
            const hasErros = Array.isArray(mensagens) &&
                             mensagens.some(msg => typeof msg === 'string' && msg.trim().length > 0);

            erros[field] = hasErros; // true ou false
            console.log(erros);
        })
        return erros;
    }


    const formValid = () => {
        const erros = validateAll();
        setError(erros);
        return !hasErrors(erros);
    }


    return {
        model,
        setModel,
        error,
        setError,
        handleChangeField,
        formValid,
    }

}



export default useValidator;
