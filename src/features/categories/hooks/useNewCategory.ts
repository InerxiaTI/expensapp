import { useState } from "react"
import { Category, CreateCategoryRequest } from "../../../interfaces/CategoriesInterface"
import { createCategory } from "../../../infrastructure/services/category.service"

export const useNewCategory = () => {

	const [isLoading, setIsLoading] = useState(false)
	const [category, setCategory] = useState<Category>()



	
	const saveCategory = async (category: CreateCategoryRequest) => {

		try {
				const response = await createCategory(category);
				console.log("response: "+JSON.stringify(response));
				//setRefreshShoppings(true)
				//setIsFocusFetchShoppings(true)
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
		saveCategory
}
}