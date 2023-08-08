import { useEffect, useState } from "react"
import { CreateShoppingListRequest, CreateShoppingListResponse, ShoppingList, ShoppingListsResponse } from "../interfaces/ShoppingInterface"
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
        getShoppingLists,
        isLoading,
        shoppingLists
    }
}

export const useNewShoppingLists = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [shoppingList, setShoppingList] = useState<ShoppingList>()


    const saveShoppingList = async (shoppingListName: string) => {

        const request: CreateShoppingListRequest = {
            usuarioCreador: 1,
            nombre: shoppingListName,
        }

        try {
            const response = await expenseMateApi.post<CreateShoppingListResponse>(
                '/api/lista-compra/crear-lista-compra', 
                request
            )
            console.log("response: "+JSON.stringify(response.data.body));
            
            setShoppingList(response.data.body)
        } catch (error) {
            console.error(error);
            throw error;
        }

        setIsLoading(false)
    }


    return {
        isLoading,
        setIsLoading,
        shoppingList,
        saveShoppingList
    }


}