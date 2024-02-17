import { createContext, useReducer  } from "react";
import { shoppingReducer } from "./ShoppingV2Reducer";


export interface ShoppingCardState {
    isCardPressed: boolean;
    isCardLongPressed: boolean;

}


export const shoppingInitialCardState: ShoppingCardState = {
    isCardLongPressed: false,
    isCardPressed: false,
}

export interface ShoppingContextProps {
    shoppingCardState: ShoppingCardState;
    setIsCardPressed: (value: boolean) => void;
    setIsCardLongPressed: (value: boolean) => void;
}

export const ShoppingV2Context = createContext({} as ShoppingContextProps)

export const ShoppingV2Provider = ({ children }: any) => {

    const [shoppingCardState, dispatch] = useReducer(shoppingReducer, shoppingInitialCardState)

    const setIsCardPressed = (value: boolean) => {
        dispatch({type: 'setIsCardPressed', payload: value})
    }

    const setIsCardLongPressed = (value: boolean) => {
        dispatch({type: 'setIsCardLongPressed', payload: value})
    }

 
    return (
        <ShoppingV2Context.Provider 
            value={{ 
                setIsCardPressed,
                setIsCardLongPressed,
                shoppingCardState,
            }}
        >
            {children}
        </ShoppingV2Context.Provider>
    );
}