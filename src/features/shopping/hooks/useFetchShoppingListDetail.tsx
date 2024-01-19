import { useCallback, useContext, useState, } from 'react';
import { Shopping, ShoppingRequest } from "../../../interfaces/ShoppingInterface";
import { getShoppingListDetail } from "../../../infrastructure/services/shopping-lists.service";
import { useFocusEffect } from '@react-navigation/native';
import { ShoppingContext } from '../../../context/ShoppingContext';
import { infoLog } from '../../../utils/HandlerError';

export const useFetchShoppingListDetail = (idShoppingList: number, idUserCompra: number) => {
    const { shoppingState, setRefreshShoppings, setIsFocusFetchShoppings} = useContext(ShoppingContext);

    const [isLoading, setIsLoading] = useState(true)
    const [shoppingDetailList, setShoppingDetailList] = useState<Shopping[]>([])

    useFocusEffect(
        useCallback(() => {
            infoLog("AQUI HOOK: "+JSON.stringify(shoppingState))
          if (shoppingState.isFocusFetchShoppings) {
            infoLog("también")
            getShoppingDetail(idShoppingList, idUserCompra)
          }
          setIsFocusFetchShoppings(false)
        }, [])
      )


    const getShoppingDetail = async (idShoppingList: number, idUserCompra: number) => {

        const request: ShoppingRequest = {
            idListaCompras: idShoppingList,
            idUsuarioCompra: idUserCompra,
            categoria: "",
            // descripcion: "ab"
        }

        try {

            const response = await getShoppingListDetail(request)

            setShoppingDetailList(response.content)
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
