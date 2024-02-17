import { ShoppingCardState } from "./ShoppingV2Context"

type ShoppingAction = 
    | {type: 'setIsCardPressed', payload: boolean}
    | {type: 'setIsCardLongPressed', payload: boolean}

export const shoppingReducer = (state: ShoppingCardState, action: ShoppingAction): ShoppingCardState => {

    switch (action.type) {
        case 'setIsCardPressed':
            return {
                ...state,
                isCardPressed: action.payload
            }
        case 'setIsCardLongPressed':
            return {
                ...state,
                isCardLongPressed: action.payload
            }
    
    }

    return state
}