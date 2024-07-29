import { useCallback, useState } from "react"
import { getCategoriesByCreator } from "../../../infrastructure/services/category.service"
import { Category } from "../../../interfaces/CategoriesInterface"
import { useFocusEffect } from "@react-navigation/native"
import { infoLog } from "../../../utils/HandlerError"


export const useFetchCategoriesByCreator = (idCreador: number) => {

	const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])

	useFocusEffect(
    useCallback(() => {
			fetchCategoriesByCreator(idCreador)
    }, [])
  )

	const fetchCategoriesByCreator = async (idCreador: number) => {

		try {
			const response = await getCategoriesByCreator(idCreador);
			infoLog(JSON.stringify(response));
			setCategories(response)
			
		} catch (error) {
			// console.error("ERROR °°°°°°°°°°°° ", error.response.data);
			throw error;
		} finally {
			setIsLoading(false)
		}

	}

	return {
		fetchCategoriesByCreator,
		isLoading,
		categories
	}

}