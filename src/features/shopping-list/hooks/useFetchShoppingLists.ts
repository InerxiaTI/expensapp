import { useFocusEffect } from "@react-navigation/native";
import { useContext, useState, useCallback, useEffect } from "react";
import { ShoppingContext } from "../../../context/ShoppingContext";
import { GenericResponse, ShoppingList } from "../../../interfaces/ShoppingInterface";
import { User } from "../../../interfaces/UserInterface";
import { getShoppingLists } from "../../../infrastructure/services/shopping-lists.service";
import { errorLog, infoLog } from "../../../utils/HandlerError";



export const useFetchShoppingLists = (user: User) => {
    const {shoppingState, setRefreshHome} = useContext(ShoppingContext);

    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingInfinite, setIsLoadingInfinite] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
    const [pageable, setPageable] = useState({
        currentPage: 0,
        size: 10,
        totalPages: 0
    })
    const [totalElements, setTotalElements] = useState(0)
    const [shoppingLists, setShoppingListsResponse] = useState<ShoppingList[]>([])

    useFocusEffect(
        useCallback(() => {

            if(shoppingState.refreshHome) {
                infoLog("SE ACTUALIZA POR AQUI 2")

                fetchShoppingLists(user!)
            }

            setRefreshHome(false)

        }, [shoppingState.refreshHome])
	)

    useEffect(()=>{
        infoLog("SE ACTUALIZA POR AQUI")
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
                const response: GenericResponse<ShoppingList> = await getShoppingLists(user!, pageable)
                const dataShowed = response.body.content

                setTotalElements(response.body.totalElements)
                setPageable({
                    ...pageable,
                    currentPage: (response.body.pageable.pageNumber),
                    totalPages: response.body.totalPages
                })

                setShoppingListsResponse([...shoppingLists, ...dataShowed])

            }

        } catch (error) {
            errorLog(error!.response.data.message);
            //throw error;

        } finally {
            setIsLoading(false);
            setIsLoadingInfinite(false);
        }
    }

    const fetchShoppingLists = async (user: User) => {
        try {
            const response: GenericResponse<ShoppingList> = await getShoppingLists(user!, {
                currentPage: 0,
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
            errorLog("Error fetching shopping lists", error);
            //throw error;

        } finally {
            setIsLoading(false);
        }
    }

    const onRefresh = () => {
        infoLog("SE ACTUALIZA POR AQUI 3")

        setRefreshing(true)
        fetchShoppingLists(user!)
        setRefreshing(false);

    };

    const onInfiniteScroll = () => {
        infoLog("SE ACTUALIZA POR AQUI 4")
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
