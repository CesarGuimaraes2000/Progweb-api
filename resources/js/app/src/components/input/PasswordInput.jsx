import React, { Fragment , useState} from 'react'
import MensagemErro from '../messages/MensagemErro';

const getInputClass = (error) => {
        if (error){
            return "form-control is-invalid";
        } else if (error===false){
            return "form-control is-valid";
        }
        return "form-control";
}

const PasswordInput = ({
  id,
  type,
  value,
  placeholder,
  handleChangeField,
  handleBlurField,
  error,
  mensagem,
}) => {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <Fragment>
        <div className='div-pass'>
            <input 
                id={id}
                type = {showPassword ? "text" : "password"}
                name = {id}
                value={value || ''}  
                placeholder={placeholder}
                onChange={handleChangeField}
                onBlur={handleBlurField}
                className={getInputClass(error)}
            />
            <button
                    type="button"
                    onMouseDown={() => setShowPassword(true)}
                    onMouseUp={() => setShowPassword(false)}
                    style={{ marginLeft: 8 }}
                    tabIndex={-1}
                    className={showPassword ? "btn-pass-show" : "btn-pass-hide"}
                />
        </div>
      {
      <MensagemErro
          error = {error}
          mensagem = {mensagem}
      />
      }
    </Fragment>
  )
}

export default PasswordInput