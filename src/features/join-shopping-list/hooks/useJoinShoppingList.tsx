import { useState } from "react"
import { JoinShoppingList, JoinShoppingListRequest } from "../../../interfaces/ShoppingInterface"
import { sendRequestAddCollaborator } from "../../../infrastructure/services/shopping-lists.service"



export const useJoinShoppingList = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [joinShoppingList, setJoinShoppingList] = useState<JoinShoppingList>()


    const saveJoinShoppingList = async (codigoGenerado: string, idUser: number) => {

        const request: JoinShoppingListRequest = {
            codigoGenerado,
            idUsuarioColaborador: idUser,
        }

        try {
            const response = await sendRequestAddCollaborator(request)
            setJoinShoppingList(response)
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false)
        }

    }


    return {
        isLoading,
        setIsLoading,
        joinShoppingList,
        saveJoinShoppingList
    }
}
