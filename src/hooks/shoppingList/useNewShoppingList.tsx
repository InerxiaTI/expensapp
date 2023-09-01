import { useState } from "react"
import { CreateShoppingListRequest, ShoppingList } from "../../interfaces/ShoppingInterface"
import { saveShoppingList } from "../../services/shoppingListsService"

export const useNewShoppingLists = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [codigo, setCodigo] = useState('')
    const [shoppingList, setShoppingList] = useState<ShoppingList>()


    const createShoppingList = async (shoppingListName: string, idUser: number) => {
        setIsLoading(true)
        const request: CreateShoppingListRequest = {
            usuarioCreador: idUser ,
            nombre: shoppingListName,
        }

        try {

            const response = await saveShoppingList(request);
            setCodigo(response.codigoGenerado)
            setShoppingList(response)
        } catch (error) {
            console.error(error);
            throw error;
            
        } finally {
            setIsLoading(false)
        }

    }


    return {
        isLoading,
        setIsLoading,
        codigo,
        setCodigo,
        shoppingList,
        createShoppingList
    }
}
