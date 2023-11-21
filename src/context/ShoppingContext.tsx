import { createContext, useReducer  } from "react";
import { shoppingReducer } from "./ShoppingReducer";
import { EditShoppingRequest } from '../interfaces/ShoppingInterface';


export interface ShoppingState {
    isFocusFetchShoppingLists: boolean;
    refreshHome: boolean;
    shoppingCardSelected: boolean;
    idShoppingCardSelected: number;
    refreshShoppings: boolean;
    shoppingToEdit?: EditShoppingRequest;
}


export const shoppingInitialState: ShoppingState = {
    isFocusFetchShoppingLists: false,
    refreshHome: false,
    shoppingCardSelected: false,
    idShoppingCardSelected: 0,
    refreshShoppings: false,
    shoppingToEdit: undefined
}

export interface ShoppingContextProps {
    shoppingState: ShoppingState;
    setIsFocusFetchShoppingLists: (value: boolean) => void;
    setRefreshHome: (value: boolean) => void;
    setShoppingCardSelected: (value: boolean) => void;
    setRefreshShoppings: (value: boolean) => void;
    setIdShoppingCardSelected: (value: number) => void;
    setShoppingToEdit: (value: EditShoppingRequest) => void;
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

    const setShoppingToEdit = (value: EditShoppingRequest) => {
        dispatch({type: 'setShoppingToEdit', payload: value})
    }

    return (
        <ShoppingContext.Provider 
            value={{ 
                shoppingState,
                setIsFocusFetchShoppingLists,
                setRefreshHome,
                setShoppingCardSelected,
                setIdShoppingCardSelected,
                setRefreshShoppings,
                setShoppingToEdit
            }}
        >
            {children}
        </ShoppingContext.Provider>
    );
}