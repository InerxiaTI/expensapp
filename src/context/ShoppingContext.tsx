import { createContext, useReducer  } from "react";
import { shoppingReducer } from "./ShoppingReducer";
import { AddExpenseParams, EditShoppingRequest } from '../interfaces/ShoppingInterface';


export interface ShoppingState {
    isFocusFetchShoppings: boolean;
    refreshHome: boolean;
    shoppingCardSelected: boolean;
    idShoppingCardSelected: number;
    refreshShoppings: boolean;
    shoppingToEdit?: EditShoppingRequest;
    addExpenseParams?: AddExpenseParams;
}


export const shoppingInitialState: ShoppingState = {
    isFocusFetchShoppings: false,
    refreshHome: false,
    shoppingCardSelected: false,
    idShoppingCardSelected: 0,
    refreshShoppings: false,
    shoppingToEdit: undefined,
    addExpenseParams: undefined
}

export interface ShoppingContextProps {
    shoppingState: ShoppingState;
    setIsFocusFetchShoppings: (value: boolean) => void;
    setRefreshHome: (value: boolean) => void;
    setShoppingCardSelected: (value: boolean) => void;
    setRefreshShoppings: (value: boolean) => void;
    setIdShoppingCardSelected: (value: number) => void;
    setShoppingToEdit: (value: EditShoppingRequest) => void;
    setAddExpenseParams: (value: AddExpenseParams) => void;
}

export const ShoppingContext = createContext({} as ShoppingContextProps)

export const ShoppingProvider = ({ children }: any) => {

    const [shoppingState, dispatch] = useReducer(shoppingReducer, shoppingInitialState)

    const setIsFocusFetchShoppings = (value: boolean) => {
        dispatch({type: 'setIsFocusFetchShoppings', payload: value})
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
    
    const setAddExpenseParams = (value: AddExpenseParams) => {
        dispatch({type: 'setAddExpenseParams', payload: value})
    }

    return (
        <ShoppingContext.Provider 
            value={{ 
                shoppingState,
                setIsFocusFetchShoppings,
                setRefreshHome,
                setShoppingCardSelected,
                setIdShoppingCardSelected,
                setRefreshShoppings,
                setShoppingToEdit,
                setAddExpenseParams
            }}
        >
            {children}
        </ShoppingContext.Provider>
    );
}