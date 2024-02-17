import { useContext, useState } from "react"
import { deleteShopping } from "../../../infrastructure/services/shopping.service"
import { ShoppingContext } from "../../../context/ShoppingContext"

export const useDeleteShopping = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [shoppingDeleted, setShoppingDeleted] = useState(false)
    const {setRefreshShoppings, setIsFocusFetchShoppings, setRefreshHome} = useContext(ShoppingContext);



    const removeShopping = async (idShopping: number) => {

        try {
            const response = await deleteShopping(idShopping);
            console.log("response delete: "+JSON.stringify(response));

            if(response.status === 200) {
                setShoppingDeleted(true);
            }

            setRefreshShoppings(true)
            setIsFocusFetchShoppings(true)
            setRefreshHome(true)

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
