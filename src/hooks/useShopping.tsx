import { useEffect, useState } from "react"
import { ShoppingList, ShoppingListsResponse } from "../interfaces/ShoppingInterface"
import expenseMateApi from "../api/expenseMateApi"


export const useShoppingLists = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([])

    const getShoppingLists = async () => {
        console.log("LLamando a la API para traer listas de compras");
        try {
            const response = await expenseMateApi.get<ShoppingListsResponse>(
                '/api/lista-compra/filter', 
                {
                    params: {
                        usuarioCreador: 1,
                    }
                }
            )
            setShoppingLists(response.data.body)
        } catch (error) {
            console.error(error);
            throw error;
        }

        setIsLoading(false)

    }

    useEffect(() => {
		getShoppingLists()
	}, [])

    return {
        isLoading,
        shoppingLists
    }
}