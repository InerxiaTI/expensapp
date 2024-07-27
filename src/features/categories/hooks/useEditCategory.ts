import { useContext, useState } from "react"
import { Category, EditCategoryRequest } from "../../../interfaces/CategoriesInterface"
import { editCategory } from "../../../infrastructure/services/category.service"
import { CategoryContext } from "../context/CategoryContext"


export const useEditCategory = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [category, setCategory] = useState<Category>()
	const {setRefreshCategory, setIdCategoryCardSelected} = useContext(CategoryContext);



	const updateCategory = async (category: EditCategoryRequest) => {

		try {
				const response = await editCategory(category);
				console.log("response: "+JSON.stringify(response));
				setRefreshCategory(true)
				//setIsFocusFetchShoppings(true)
				setIdCategoryCardSelected(0)
				//setRefreshHome(true)
				setCategory(response)
		} catch (error) {
				console.error("ERROR °°°°°°°°°°°° ", error.response.data);
				throw error;
		} finally{
				setIsLoading(false)
		}

	}


	return {
			isLoading,
			setIsLoading,
			category,
			updateCategory
	}
}