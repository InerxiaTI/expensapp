import { useContext, useState } from "react"
import { CreateShopping, EditShoppingRequest } from "../../../interfaces/ShoppingInterface"
import { editShopping } from "../../../infrastructure/services/shopping-lists.service"
import { ShoppingContext } from "../../../context/ShoppingContext"
import { infoLog } from "../../../utils/HandlerError"

export const useEditShopping = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [shopping, setShopping] = useState<CreateShopping>()
    const {setRefreshShoppings, setIsFocusFetchShoppings, setRefreshHome} = useContext(ShoppingContext);



    const updateShopping = async (shopping: EditShoppingRequest) => {

        try {
            infoLog(JSON.stringify(shopping));
            
            const response = await editShopping(shopping);
            console.log("response: "+JSON.stringify(response));
            setRefreshShoppings(true)
            setIsFocusFetchShoppings(true)
            setRefreshHome(true)
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
