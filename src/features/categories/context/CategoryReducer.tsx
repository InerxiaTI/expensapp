import { EditCategoryRequest } from "../../../interfaces/CategoriesInterface";
import { CategoryState } from "./CategoryContext";

type CategoryAction = 
	| {type: 'setIsCategoryCardSelected', payload: boolean}
	| {type: 'setIdCategoryCardSelected', payload: number}
	| {type: 'setCategoryToEdit', payload: EditCategoryRequest}
	| {type: 'setRefreshCategory', payload: boolean}


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
			case 'setCategoryToEdit':
				return {
					...state,
					categoryToEdit: action.payload
				}
			case 'setRefreshCategory':
				return {
						...state,
						refreshCategory: action.payload
				}

	}
}
