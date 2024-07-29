import { AddExpenseParams, EditShoppingRequest } from "../interfaces/ShoppingInterface"
import { ShoppingState } from "./ShoppingContext"

type ShoppingAction = 
    | {type: 'setIsFocusFetchShoppings', payload: boolean}
    | {type: 'setRefreshHome', payload: boolean}
    | {type: 'setShoppingCardSelected', payload: boolean}
    | {type: 'setRefreshShoppings', payload: boolean}
    | {type: 'setIdShoppingCardSelected', payload: number}
    | {type: 'setShoppingToEdit', payload: EditShoppingRequest}
    | {type: 'setAddExpenseParams', payload: AddExpenseParams}

export const shoppingReducer = (state: ShoppingState, action: ShoppingAction): ShoppingState => {

    switch (action.type) {
        case 'setIsFocusFetchShoppings':
            return {
                ...state,
                isFocusFetchShoppings: action.payload
            }
        case 'setRefreshHome':
            return {
                ...state,
                refreshHome: action.payload
            }
        case 'setShoppingCardSelected':
            return {
                ...state,
                shoppingCardSelected: action.payload
            }
        case 'setIdShoppingCardSelected':
            return {
                ...state,
                idShoppingCardSelected: action.payload
            }
        case 'setRefreshShoppings':
            return {
                ...state,
                refreshShoppings: action.payload
            }
        case 'setShoppingToEdit':
            return {
                ...state,
                shoppingToEdit: action.payload
            }
        case 'setAddExpenseParams':
            return {
                ...state,
                addExpenseParams: action.payload
            }
    }

    return state
}