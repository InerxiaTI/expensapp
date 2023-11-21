import { useState } from "react"
import { CreateShopping, EditShoppingRequest } from "../../interfaces/ShoppingInterface"
import { editShopping } from "../../infrastructure/services/shopping-lists.service"

export const useEditShopping = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [shopping, setShopping] = useState<CreateShopping>()


    const updateShopping = async (shopping: EditShoppingRequest) => {

        try {
            const response = await editShopping(shopping);
            console.log("response: "+JSON.stringify(response));

            setShopping(response)
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
        updateShopping
    }
}
