import { useState, } from 'react';
import { Shopping, ShoppingRequest } from "../../interfaces/ShoppingInterface";
import { getShoppingListDetail } from "../../services/shoppingListsService";

export const useFetchShoppingListDetail = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [shoppingDetailList, setShoppingDetailList] = useState<Shopping[]>([])


    const getShoppingDetail = async (idShoppingList: number, idUserCompra: number) => {      

        const request: ShoppingRequest = {
            idListaCompras: idShoppingList,
            idUsuarioCompra: idUserCompra
            // categoria: "ER",
            // descripcion: "ab"
        }

        try {

            const response = await getShoppingListDetail(request)
           
            setShoppingDetailList(response)
        } catch (error) {
            console.error("ERROR °°°°°°°°°°°° ", error.response.data);
            throw error;
        } finally {
            setIsLoading(false)
        }


    }

    return {
        getShoppingDetail,
        isLoading,
        shoppingDetailList
    }
}