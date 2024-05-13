import { createContext, useReducer  } from "react";
import { categoryReducer } from "./CategoryReducer";


export interface CategoryState {
	isCategoryCardSelected: boolean;
	idCategoryCardSelected: number;
}

export const categoryInitialState: CategoryState = {
	isCategoryCardSelected: false,
	idCategoryCardSelected: 0
}

export interface CategoryContextProps {
	categoryState: CategoryState;
	setIsCategoryCardSelected: (value: boolean) => void;
	setIdCategoryCardSelected: (value: number) => void;

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

	return (
		<CategoryContext.Provider
			value={{
				categoryState,
				setIsCategoryCardSelected,
				setIdCategoryCardSelected
			}}
		>
			{children}
		</CategoryContext.Provider>

	)

}