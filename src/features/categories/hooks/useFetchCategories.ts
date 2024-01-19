import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { ShoppingContext } from "../../../context/ShoppingContext";
import { CategoriesFilterRequest, Category } from "../../../interfaces/CategoriesInterface";
import { getCategories } from "../../../infrastructure/services/category.service";
import { useFocusEffect } from "@react-navigation/native";


export const useFetchCategories = (request: CategoriesFilterRequest) => {
  const { shoppingState, setIsFocusFetchShoppings } = useContext(ShoppingContext);

  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
	const [pageable, setPageable] = useState({
		currentPage: 0,
		size: 100,
		totalPages: 0
})

  useFocusEffect(
    useCallback(() => {
      if (!shoppingState.isFocusFetchShoppings) {
        fetchCategories(request)
      }
      setIsFocusFetchShoppings(false)
    }, [])
  )

  const fetchCategories = async (request: CategoriesFilterRequest) => {

    console.log("RR LLamando a la API para traer listas de categorias: ", JSON.stringify(request));
    try {

      const response = await getCategories(request, pageable)


      setCategories(response.content)

    } catch (error) {
      // console.error("ERROR °°°°°°°°°°°° ", error.response.data);
      throw error;
    } finally {
			setIsLoading(false)
		}
  }

  const reloadCategories = async () => {
    setIsLoading(true);
    await fetchCategories(request);
    setIsLoading(false);
  };

  return {
    reloadCategories,
    fetchCategories,
    isLoading,
    categories
  }
}
