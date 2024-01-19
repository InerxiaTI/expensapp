import { useState } from "react"
import { deleteShopping } from "../../../infrastructure/services/shopping.service"

export const useDeleteShopping = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [shoppingDeleted, setShoppingDeleted] = useState(false)


    const removeShopping = async (idShopping: number) => {

        try {
            const response = await deleteShopping(idShopping);
            console.log("response delete: "+JSON.stringify(response));

            if(response.status === 200) {
                setShoppingDeleted(true);
            }

        } catch (error) {
            console.log("ERROR °°°°°°°°°°°° ", error.response.data);
            throw error;
        } finally{
            setIsLoading(false)

        }

    }


    return {
        isLoading,
        setIsLoading,
        removeShopping
    }
}
