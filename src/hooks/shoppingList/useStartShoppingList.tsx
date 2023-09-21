import { useState } from "react"
import { ShoppingList } from "../../interfaces/ShoppingInterface"
import { startShoppingList } from "../../services/shoppingListsService"


export const useStartShoppingList = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [shoppingList, setShoppingList] = useState<ShoppingList>()


    const saveStartShoppingList = async (idListaCompras: number) => {

        try {
            const response = await startShoppingList(idListaCompras)
            console.log("88888888888888888888888888888888\n response: "+JSON.stringify(response));
            
            setShoppingList(response)
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
