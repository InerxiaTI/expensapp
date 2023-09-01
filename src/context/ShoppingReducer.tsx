import { ShoppingState } from "./ShoppingContext"

type ShoppingAction = 
    | {type: 'setIsFocusFetchShoppingLists', payload: boolean}

export const shoppingReducer = (state: ShoppingState, action: ShoppingAction): ShoppingState => {

    switch (action.type) {
        case 'setIsFocusFetchShoppingLists':
            return {
                ...state,
                isFocusFetchShoppingLists: action.payload
            }
    }

    return state
}