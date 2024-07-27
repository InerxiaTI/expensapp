import { createContext, useReducer  } from "react";
import { categoryReducer } from "./CategoryReducer";
import { EditCategoryRequest } from "../../../interfaces/CategoriesInterface";


export interface CategoryState {
	isCategoryCardSelected: boolean;
	idCategoryCardSelected: number;
	categoryToEdit?: EditCategoryRequest;
	refreshCategory: boolean;


}

export const categoryInitialState: CategoryState = {
	isCategoryCardSelected: false,
	idCategoryCardSelected: 0,
	categoryToEdit: undefined,
	refreshCategory: false
}

export interface CategoryContextProps {
	categoryState: CategoryState;
	setIsCategoryCardSelected: (value: boolean) => void;
	setIdCategoryCardSelected: (value: number) => void;
	setCategoryToEdit: (value: EditCategoryRequest) => void;
	setRefreshCategory: (value: boolean) => void;
}

export const CategoryContext = createContext({} as CategoryContextProps)

export const CategoryProvider = ({children}: any) => {

	const [categoryState, dispatch] = useReducer(categoryReducer, categoryInitialState);


	const setIsCategoryCardSelected = (value: boolean) => {
		dispatch({type: 'setIsCategoryCardSelected', payload: value})
	}

	const setIdCategoryCardSelected = (value: number) => {
			dispatch({type: 'setIdCategoryCardSelected', payload: value})
	}

	const setCategoryToEdit = (value: EditCategoryRequest) => {
		dispatch({type: 'setCategoryToEdit', payload: value})
	}

	const setRefreshCategory = (value: boolean) => {
		dispatch({type: 'setRefreshCategory', payload: value})
	}


	return (
		<CategoryContext.Provider
			value={{
				categoryState,
				setIsCategoryCardSelected,
				setIdCategoryCardSelected,
				setCategoryToEdit,
				setRefreshCategory
			}}
		>
			{children}
		</CategoryContext.Provider>

	)

}