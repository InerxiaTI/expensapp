import { AddExpenseParams, EditShoppingRequest, ShoppingList } from "../interfaces/ShoppingInterface"
import { Collaborator } from "../interfaces/UserInterface"
import { ShoppingState } from "./ShoppingContext"

type ShoppingAction = 
    | {type: 'setIsFocusFetchShoppings', payload: boolean}
    | {type: 'setRefreshHome', payload: boolean}
    | {type: 'setShoppingCardSelected', payload: boolean}
    | {type: 'setRefreshShoppings', payload: boolean}
    | {type: 'setIdShoppingCardSelected', payload: number}
    | {type: 'setShoppingToEdit', payload: EditShoppingRequest}
    | {type: 'setAddExpenseParams', payload: AddExpenseParams}
    | {type: 'setCollaborators', payload: Collaborator[]}
    | {type: 'setShoppingList', payload: ShoppingList}

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
        case 'setCollaborators':
            return {
                ...state,
                collaborators: action.payload
            }
        case 'setShoppingList':
            return {
                ...state,
                shoppingList: action.payload
            }
    }

    return state
}