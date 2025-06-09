import React, { Fragment } from 'react'
import MensagemErro from '../messages/MensagemErro';

const getInputClass = (error) => {
        if (error){
            return "form-control is-invalid";
        } else if (error===false){
            return "form-control is-valid";
        }
        return "form-control";
}

const Input = ({
  id,
  type,
  value,
  placeholder,
  handleChangeField,
  handleBlurField,
  error,
  mensagem,
}) => {
  return (
    <Fragment>
      <input 
          id={id}
          type = {type}
          name = {id}
          value={value || ''}  
          placeholder={placeholder}
          onChange={handleChangeField}
          onBlur={handleBlurField}
          className={getInputClass(error)}
      />
      {
      <MensagemErro
          error = {error}
          mensagem = {mensagem}
      />
      }
    </Fragment>
  )
}

export default Input