import { useContext, useState } from "react"
import { CreateShopping, CreateShoppingRequest } from "../../../interfaces/ShoppingInterface"
import { createShopping } from "../../../infrastructure/services/shopping-lists.service"
import { ShoppingContext } from "../../../context/ShoppingContext"

export const useNewShopping = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [shopping, setShopping] = useState<CreateShopping>()
    const { setRefreshShoppings, setIsFocusFetchShoppings} = useContext(ShoppingContext);



    const saveShopping = async (shopping: CreateShoppingRequest) => {

        try {
            const response = await createShopping(shopping);
            console.log("response: "+JSON.stringify(response));
            setRefreshShoppings(true)
            setIsFocusFetchShoppings(true)
            setShopping(response)
        } catch (error) {
            console.error("ERROR °°°°°°°°°°°° ", error.response.data);
            throw error;
        } finally{
            setIsLoading(false)
        }

    }


    return {
        isLoading,
        setIsLoading,
        shopping,
        saveShopping
    }
}
