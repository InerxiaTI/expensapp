import { useState, useContext } from "react"
import { ShoppingList } from "../../../interfaces/ShoppingInterface"
import { startShoppingList } from "../../../infrastructure/services/shopping-lists.service"
import { ShoppingContext } from "../../../context/ShoppingContext";


export const useStartShoppingList = () => {
    const { setRefreshHome } = useContext(ShoppingContext);

    const [isLoading, setIsLoading] = useState(false)
    const [shoppingList, setShoppingList] = useState<ShoppingList>()


    const saveStartShoppingList = async (idListaCompras: number) => {

        try {
            const response = await startShoppingList(idListaCompras)
            console.log("88888888888888888888888888888888\n response: "+JSON.stringify(response));

            setShoppingList(response)
            setRefreshHome(true)
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
