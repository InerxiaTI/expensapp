import { CategoryState } from "./CategoryContext";

type CategoryAction = 
	| {type: 'setIsCategoryCardSelected', payload: boolean}
	| {type: 'setIdCategoryCardSelected', payload: number}


export const categoryReducer = (state: CategoryState, action: CategoryAction): CategoryState =>{
	
	switch(action.type) {
		case 'setIsCategoryCardSelected':
			return {
				...state,
				isCategoryCardSelected: action.payload
			}
			case 'setIdCategoryCardSelected':
				return {
					...state,
					idCategoryCardSelected: action.payload
				}

	}
}
