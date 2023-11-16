import { ShoppingState } from "./ShoppingContext"

type ShoppingAction = 
    | {type: 'setIsFocusFetchShoppingLists', payload: boolean}
    | {type: 'setRefreshHome', payload: boolean}
    | {type: 'setShoppingCardSelected', payload: boolean}
    | {type: 'setRefreshShoppings', payload: boolean}
    | {type: 'setIdShoppingCardSelected', payload: number}

export const shoppingReducer = (state: ShoppingState, action: ShoppingAction): ShoppingState => {

    switch (action.type) {
        case 'setIsFocusFetchShoppingLists':
            return {
                ...state,
                isFocusFetchShoppingLists: action.payload
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
    }

    return state
}