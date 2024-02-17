import React, { createContext, useEffect, useReducer } from 'react'
import { authReducer } from './AuthReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../interfaces/UserInterface';
import { reset } from '../navigation/servicesUtil/NavigationService';

export interface AuthState {
    isLoggedIn: boolean,
    user?: User,
    status: 'checking' | 'authenticated' | 'notAuthenticated'
}

//estado inicial
export const authInitialState: AuthState = {
    isLoggedIn: false,
    user: undefined,
    status: 'checking'
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

    useEffect(() => {
        checkToken()
    }, [])

    const checkToken = async () => {
        console.log("AQUI 1008: "+JSON.stringify(authState));
        
        const userData = await AsyncStorage.getItem('user');
        console.log("AQUI 1009 "+JSON.stringify(userData));
        

      if (userData) {
        const parsedUserData = JSON.parse(userData);
        signIn(parsedUserData);
        console.log("AQUI 1010: "+JSON.stringify(authState));

      } else {
        return dispatch({type: 'notAuthenticated'})
      } 
    }

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