import { useCallback, useContext, useState, } from 'react';
import { Shopping, ShoppingRequest } from "../../interfaces/ShoppingInterface";
import { getShoppingListDetail } from "../../infrastructure/services/shopping-lists.service";
import { useFocusEffect } from '@react-navigation/native';
import { ShoppingContext } from '../../context/ShoppingContext';

export const useFetchShoppingListDetail = (idShoppingList: number, idUserCompra: number) => {
    const { shoppingState, setIsFocusFetchShoppingLists } = useContext(ShoppingContext);

    const [isLoading, setIsLoading] = useState(true)
    const [shoppingDetailList, setShoppingDetailList] = useState<Shopping[]>([])

    useFocusEffect(
        useCallback(() => {
          if (!shoppingState.isFocusFetchShoppingLists) {
            getShoppingDetail(idShoppingList, idUserCompra)
          }
          setIsFocusFetchShoppingLists(false)
        }, [])
      )


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
