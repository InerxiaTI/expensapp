import { createContext, useReducer  } from "react";
import { shoppingReducer } from "./ShoppingReducer";


export interface ShoppingState {
    isFocusFetchShoppingLists: boolean;
    refreshHome: boolean;
    shoppingCardSelected: boolean;
    idShoppingCardSelected: number;
    refreshShoppings: boolean;
}


export const shoppingInitialState: ShoppingState = {
    isFocusFetchShoppingLists: false,
    refreshHome: false,
    shoppingCardSelected: false,
    idShoppingCardSelected: 0,
    refreshShoppings: false
}

export interface ShoppingContextProps {
    shoppingState: ShoppingState;
    setIsFocusFetchShoppingLists: (value: boolean) => void;
    setRefreshHome: (value: boolean) => void;
    setShoppingCardSelected: (value: boolean) => void;
    setRefreshShoppings: (value: boolean) => void;
    setIdShoppingCardSelected: (value: number) => void;
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

    const setShoppingCardSelected = (value: boolean) => {
        dispatch({type: 'setShoppingCardSelected', payload: value})
    }

    const setIdShoppingCardSelected = (value: number) => {
        dispatch({type: 'setIdShoppingCardSelected', payload: value})
    }

    const setRefreshShoppings = (value: boolean) => {
        dispatch({type: 'setRefreshShoppings', payload: value})
    }

    return (
        <ShoppingContext.Provider 
            value={{ 
                shoppingState,
                setIsFocusFetchShoppingLists,
                setRefreshHome,
                setShoppingCardSelected,
                setIdShoppingCardSelected,
                setRefreshShoppings
            }}
        >
            {children}
        </ShoppingContext.Provider>
    );
}