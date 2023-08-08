import { User } from "../interfaces/UserInterface";
import { AuthState } from "./AuthContext";

type AuthAction = 
    | {type: 'signIn', payload: User}
    | {type: 'changeFavIcon', payload: string}
    | {type: 'changeUserName', payload: User}
    | {type: 'logOut'}

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {

    switch (action.type) {
        case 'signIn':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
                
            }
        case 'changeFavIcon':
            return {
                ...state,
                favoriteIcon: action.payload
            }
        case "changeUserName":
            return {
                ...state,
                user: action.payload
            }
        case "logOut":
            return {
                ...state,
                isLoggedIn: false,
                user: undefined
            }
    }


    return state;
}