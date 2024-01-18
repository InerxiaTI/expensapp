import { User } from "../interfaces/UserInterface";
import { AuthState } from "./AuthContext";

type AuthAction = 
    | {type: 'signIn', payload: User}
    | {type: 'logOut'}
    | {type: 'notAuthenticated'}

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {

    switch (action.type) {
        case 'signIn':
            return {
                ...state,
                isLoggedIn: true,
                status: 'authenticated',
                user: action.payload
                
            }
        case "notAuthenticated":
        case "logOut":
            return {
                ...state,
                isLoggedIn: false,
                status: 'notAuthenticated',
                user: undefined
            }
    }


    return state;
}