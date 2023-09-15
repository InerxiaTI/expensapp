import { useState } from "react"
import { CreateShopping, CreateShoppingListResponse, CreateShoppingRequest, CreateShoppingResponse, ShoppingList } from "../interfaces/ShoppingInterface"
import expenseMateApi from "../api/expenseMateApi"



//crear compra
export const useNewShopping = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [shopping, setShopping] = useState<CreateShopping>()


    const saveShopping = async (shopping: CreateShoppingRequest) => {

        try {
            const response = await expenseMateApi.post<CreateShoppingResponse>(
                '/api/compra/crear-compra', 
                shopping
            )
            console.log("response: "+JSON.stringify(response.data.body));
            
            setShopping(response.data.body)
        } catch (error) {
            console.error("ERROR °°°°°°°°°°°° ", error.response.data);
            throw error;
        }

        setIsLoading(false)
    }


    return {
        isLoading,
        setIsLoading,
        shopping,
        saveShopping
    }
}



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



