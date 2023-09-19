import { useState } from "react"
import { CreateShopping, CreateShoppingListResponse, CreateShoppingRequest, CreateShoppingResponse, ShoppingList } from "../interfaces/ShoppingInterface"
import expenseMateApi from "../api/expenseMateApi"







export const useStartShoppingList = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [shoppingList, setShoppingList] = useState<ShoppingList>()


    const saveStartShoppingList = async (idListaCompras: number) => {

        try {
            const response = await expenseMateApi.put<CreateShoppingListResponse>(
                `/api/lista-compra/inicializar-lista-compras?idListaCompras=${idListaCompras}`
            )
            console.log("88888888888888888888888888888888\n response: "+JSON.stringify(response.data.body));
            
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
        saveStartShoppingList
    }
}



