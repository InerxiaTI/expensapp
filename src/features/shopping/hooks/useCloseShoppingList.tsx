import { useState, useContext } from "react"
import { ShoppingList } from "../../../interfaces/ShoppingInterface"
import { closeShoppingList } from "../../../infrastructure/services/shopping-lists.service"
import { ShoppingContext } from "../../../context/ShoppingContext";


export const useCloseShoppingList = () => {
    const { setRefreshHome, setShoppingList: setSoppingListContext } = useContext(ShoppingContext);

    const [isLoading, setIsLoading] = useState(false)
    const [shoppingList, setShoppingList] = useState<ShoppingList>()


    const saveCloseShoppingList = async (idListaCompras: number) => {

        try {
            const response = await closeShoppingList(idListaCompras)
            console.log("QQQQQQQQQQQQQQQQQQ---- "+JSON.stringify(response));
            setShoppingList(response)
            setSoppingListContext(response)
            setRefreshHome(true)
        } catch (error) {
            throw error;
        }

        setIsLoading(false)
    }


    return {
        isLoading,
        setIsLoading,
        shoppingList,
        saveCloseShoppingList
    }
}
