import { useContext, useState } from "react"
import { CreateShoppingListRequest, ShoppingList } from "../../interfaces/ShoppingInterface"
import { saveShoppingList } from "../../services/shoppingListsService"
import { ShoppingContext } from "../../context/ShoppingContext";

export const useNewShoppingLists = () => {
    const {shoppingState, setRefreshHome} = useContext(ShoppingContext);

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
            setRefreshHome(true)
            
        } catch (error) {
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
