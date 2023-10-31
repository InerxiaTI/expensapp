import { ShoppingState } from "./ShoppingContext"

type ShoppingAction = 
    | {type: 'setIsFocusFetchShoppingLists', payload: boolean}
    | {type: 'setRefreshHome', payload: boolean}

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
    }

    return state
}