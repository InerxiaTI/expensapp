import { createContext, useReducer  } from "react";
import { shoppingReducer } from "./ShoppingReducer";


export interface ShoppingState {
    isFocusFetchShoppingLists: boolean;
    refreshHome: boolean;
}


export const shoppingInitialState: ShoppingState = {
    isFocusFetchShoppingLists: false,
    refreshHome: true
}

export interface ShoppingContextProps {
    shoppingState: ShoppingState;
    setIsFocusFetchShoppingLists: (value: boolean) => void;
    setRefreshHome: (value: boolean) => void;
}

export const ShoppingContext = createContext({} as ShoppingContextProps)

export const ShoppingProvider = ({ children }: any) => {

    const [shoppingState, dispatch] = useReducer(shoppingReducer, shoppingInitialState)

    const setIsFocusFetchShoppingLists = (value: boolean) => {
        dispatch({type: 'setIsFocusFetchShoppingLists', payload: value})
    }

    const setRefreshHome = (value: boolean) => {
        dispatch({type: 'setRefreshHome', payload: value})
    }


    return (
        <ShoppingContext.Provider 
            value={{ 
                shoppingState,
                setIsFocusFetchShoppingLists,
                setRefreshHome
            }}
        >
            {children}
        </ShoppingContext.Provider>
    );
}