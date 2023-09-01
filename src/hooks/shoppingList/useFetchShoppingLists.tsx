import { useFocusEffect } from "@react-navigation/native";
import { useContext, useState, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ShoppingContext } from "../../context/ShoppingContext";
import { ShoppingList } from "../../interfaces/ShoppingInterface";
import { User } from "../../interfaces/UserInterface";
import { getShoppingLists } from "../../services/shoppingListsService";



export const useFetchShoppingLists = () => {
    const {authState} = useContext(AuthContext);
    const {shoppingState, setIsFocusFetchShoppingLists} = useContext(ShoppingContext);
    const user = authState.user

    const [isLoading, setIsLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false);

    const [shoppingLists, setShoppingListsResponse] = useState<ShoppingList[]>([])

    useFocusEffect(
        useCallback(() => {           
            if(!shoppingState.isFocusFetchShoppingLists) {
                fetchShoppingLists(user!)            
            }
            setIsFocusFetchShoppingLists(false)
        }, [])
	)

    const fetchShoppingLists = async (user: User) => {
        try {
            const response = await getShoppingLists(user!)          
            setShoppingListsResponse(response)
        } catch (error) {
            console.error(error);
            throw error;
            
        } finally {
            console.log("aquí");
            
            setIsLoading(false);
        }
    }

    const onRefresh = () => {
        setRefreshing(true)
        fetchShoppingLists(user!)
        setRefreshing(false);
    
      };

    return {
        isLoading,
        shoppingLists,
        onRefresh,
        refreshing
    }
}
