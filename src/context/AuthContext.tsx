import React, { createContext, useReducer } from 'react'
import { authReducer } from './AuthReducer';
import { User } from '../interfaces/UserInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AuthState {
    isLoggedIn: boolean,
    user?: User,
}

//estado inicial
export const authInitialState: AuthState = {
    isLoggedIn: false,
    user: undefined,
}

//todo lo que el contexto proporcionará a los hijos
export interface AuthContextProps {
    authState: AuthState,
    signIn: (user: User) => void,
    logOut: () => void

}

// crear contexto
export const AuthContext = createContext({} as AuthContextProps);

// exponer el proveedor de estado

export const AuthProvider = ({children}: any) => {

    const [authState, dispatch] = useReducer(authReducer, authInitialState)

    const signIn = async (user: User) => {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        dispatch({type: 'signIn', payload: user})
    }

    const logOut = async () => {
        await AsyncStorage.removeItem('user');
        dispatch({type: 'logOut'})

    }

 
    return (
        <AuthContext.Provider 
            value={{
                authState,
                signIn, 
                logOut
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}