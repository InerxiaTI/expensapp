import { useFocusEffect } from "@react-navigation/native";
import { useContext, useState, useCallback, useEffect } from "react";
import { ShoppingContext } from "../../context/ShoppingContext";
import { ShoppingList, ShoppingListsResponse } from "../../interfaces/ShoppingInterface";
import { User } from "../../interfaces/UserInterface";
import { getShoppingLists } from "../../services/shoppingListsService";



export const useFetchShoppingLists = (user: User) => {
    const {shoppingState, setRefreshHome} = useContext(ShoppingContext);

    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingInfinite, setIsLoadingInfinite] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
    const [pageable, setPageable] = useState({
        currentPage: 1,
        size: 10,
        totalPages: 0
    })
    const [totalElements, setTotalElements] = useState(0)
    const [shoppingLists, setShoppingListsResponse] = useState<ShoppingList[]>([])

    useFocusEffect(
        useCallback(() => {    
               
            if(shoppingState.refreshHome) {
                fetchShoppingLists(user!)          
            }

            setRefreshHome(false)

        }, [shoppingState.refreshHome])
	)

    useEffect(()=>{
        fetchShoppingLists(user!)
    },[])

    const fetchShoppingListsInfinite = async (user: User) => {
        try {

            if (pageable.currentPage <  pageable.totalPages|| pageable.totalPages===0 ) {

                setPageable({
                    ...pageable,
                    currentPage: pageable.currentPage++,
                })

                setIsLoadingInfinite(true)
                const response: ShoppingListsResponse = await getShoppingLists(user!, pageable)
                const dataShowed = response.body.content 
                
                setTotalElements(response.body.totalElements)
                setPageable({
                    ...pageable,
                    currentPage: parseInt(response.body.page),
                    totalPages: response.body.totalPages
                })

                setShoppingListsResponse([...shoppingLists, ...dataShowed])

            }
           
        } catch (error) {
            console.error(error);
            throw error;
            
        } finally {            
            setIsLoading(false);
            setIsLoadingInfinite(false);
        }
    }

    const fetchShoppingLists = async (user: User) => {
        try {
            const response: ShoppingListsResponse = await getShoppingLists(user!, {
                currentPage: 1,
                size: 10,
                totalPages: 0
            })
            const dataShowed = response.body.content 
            
            setTotalElements(response.body.totalElements)

            setPageable({
                ...pageable,
                currentPage: 1,
                totalPages: response.body.totalPages
            })

            setShoppingListsResponse(dataShowed)
        } catch (error) {
            console.error(error);
            throw error;
            
        } finally {            
            setIsLoading(false);
        }
    }

    const onRefresh = () => {        
        setRefreshing(true)
        fetchShoppingLists(user!)
        setRefreshing(false);
    
    };

    const onInfiniteScroll = () => {
        fetchShoppingListsInfinite(user!)
    }

    return {
        isLoading,
        shoppingLists,
        onRefresh,
        refreshing,
        onInfiniteScroll,
        totalElements,
        isLoadingInfinite
    }
}
