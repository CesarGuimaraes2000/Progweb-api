import { createContext, useState } from "react"

export const LoginContexto = createContext(null);

const ContextProvider = ({children}) => {
    const [user,setUser] = useState({});
    const [token, setToken] = useState(localStorage.getItem('TOKEN'));

    const _setToken = (token) => {
        setToken(token)
        if(token){
            localStorage.setItem('TOKEN',token);
        }
        else{
            localStorage.removeItem('TOKEN');
        }
    }

    return (
        <LoginContexto.Provider value = {{
            _setToken, user, token
        }}>{children}
        </LoginContexto.Provider>
    )
}

export default LoginContexto.Provider;