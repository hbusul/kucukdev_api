import { createContext, useState, useLayoutEffect } from 'react'

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [login, setLogin] = useState(JSON.parse(localStorage.getItem("LOGIN")) || false)
    const loginState = [login, setLogin];

    useLayoutEffect(() => {
        localStorage.setItem("LOGIN", JSON.stringify(login));
    }, [login]);


    return (
        <UserContext.Provider value={loginState}>
            {props.children}
        </UserContext.Provider>
    )

}