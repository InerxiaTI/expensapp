import React, { createContext, useReducer } from 'react'
import { View } from 'react-native'
import { authReducer } from './AuthReducer';
import { User } from '../interfaces/UserInterface';

export interface AuthState {
    isLoggedIn: boolean,
    user?: User,
    favoriteIcon?: string
}

//estado inicial
export const authInitialState: AuthState = {
    isLoggedIn: false,
    user: undefined,
    favoriteIcon: undefined
}

//todo lo que el contexto proporcionará a los hijos
export interface AuthContextProps {
    authState: AuthState,
    signIn: (user: User) => void,
    changeFavIcon: (icon: string) => void,

}

// crear contexto
export const AuthContext = createContext({} as AuthContextProps);

// exponer el proveedor de estado

export const AuthProvider = ({children}: any) => {

    const [authState, dispatch] = useReducer(authReducer, authInitialState)

    const signIn = (user: User) => {

        dispatch({type: 'signIn', payload: user})
    }

    const changeFavIcon = (icon: string) => {
        dispatch({type: 'changeFavIcon', payload: icon})
    }

    // const changeUserName = (name: string) => {
    //     dispatch({type: 'changeUserName', payload: name})
    // }

    return (
        <AuthContext.Provider 
            value={{
                authState,
                signIn, 
                changeFavIcon
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}