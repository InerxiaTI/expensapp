import { useState } from "react"
import { JoinShoppingList, JoinShoppingListRequest, JoinsShoppingListResponse } from '../interfaces/ShoppingInterface';
import expenseMateApi from "../api/expenseMateApi"



export const useJoinShoppingList = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [joinShoppingList, setJoinShoppingList] = useState<JoinShoppingList>()


    const saveJoinShoppingList = async (codigoGenerado: string, idUser: number) => {

        const request: JoinShoppingListRequest = {
            codigoGenerado,
            idUsuarioColaborador: idUser,
        }

        try {
            const response = await expenseMateApi.post<JoinsShoppingListResponse>(
                '/api/lista-compra/solicitud-agregar-colaborador', 
                request
            )
            console.log("response: "+JSON.stringify(response.data.body));
            
            setJoinShoppingList(response.data.body)
        } catch (error) {
            console.error(error);
            throw error;
        }

        setIsLoading(false)
    }


    return {
        isLoading,
        setIsLoading,
        joinShoppingList,
        saveJoinShoppingList
    }
}