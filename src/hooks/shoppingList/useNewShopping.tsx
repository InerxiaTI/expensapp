import { useState } from "react"
import { CreateShopping, CreateShoppingRequest } from "../../interfaces/ShoppingInterface"
import { createShopping } from "../../services/shoppingListsService"

export const useNewShopping = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [shopping, setShopping] = useState<CreateShopping>()


    const saveShopping = async (shopping: CreateShoppingRequest) => {

        try {
            const response = await createShopping(shopping);
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
        saveShopping
    }
}