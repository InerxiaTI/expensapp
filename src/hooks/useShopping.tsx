import { useContext, useEffect, useState } from "react"
import { CreateShoppingListRequest, CreateShoppingListResponse, Shopping, ShoppingList, ShoppingListsResponse, ShoppingRequest, ShoppingResponse } from "../interfaces/ShoppingInterface"
import expenseMateApi from "../api/expenseMateApi"
import { AuthContext } from "../context/AuthContext";
import { User } from "../interfaces/UserInterface";


export const useShoppingLists = () => {
    const {authState} = useContext(AuthContext);
    console.log("auth: ", authState);
    const user = authState.user

    const [isLoading, setIsLoading] = useState(true)
    const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([])

    const getShoppingLists = async (user: User) => {
        console.log("LLamando a la API para traer listas de compras");
        try {
            const response = await expenseMateApi.get<ShoppingListsResponse>(
                '/api/lista-compra/filter', 
                {
                    params: {
                        usuarioCreador: user.id,
                    }
                }
            )
            setShoppingLists(response.data.body)
        } catch (error) {
            console.error(error);
            throw error;
        }

        setIsLoading(false)

    }

    useEffect(() => {
		getShoppingLists(user!)
	}, [])

    return {
        getShoppingLists,
        isLoading,
        shoppingLists
    }
}

export const useNewShoppingLists = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [shoppingList, setShoppingList] = useState<ShoppingList>()


    const saveShoppingList = async (shoppingListName: string) => {

        const request: CreateShoppingListRequest = {
            usuarioCreador: 1,
            nombre: shoppingListName,
        }

        try {
            const response = await expenseMateApi.post<CreateShoppingListResponse>(
                '/api/lista-compra/crear-lista-compra', 
                request
            )
            console.log("response: "+JSON.stringify(response.data.body));
            
            setShoppingList(response.data.body)
        } catch (error) {
            console.error(error);
            throw error;
        }

        setIsLoading(false)
    }


    return {
        isLoading,
        setIsLoading,
        shoppingList,
        saveShoppingList
    }


}



export const useShoppingDetail = (idShoppingList: number) => {
    const {authState} = useContext(AuthContext);
    console.log("auth useShoppingDetail: ", authState);
    const user = authState.user

    const [isLoading, setIsLoading] = useState(true)
    const [shoppingDetailList, setShoppingDetailList] = useState<Shopping[]>([])

    const getShoppingDetail = async () => {

        console.log("Auth 2### ", user?.id );
        console.log("################### isl: ", idShoppingList);
        

        const request: ShoppingRequest = {
            idListaCompras: idShoppingList,
            idUsuarioCompra: user!.id
            // categoria: "ER",
            // descripcion: "ab"
        }

        console.log("RR LLamando a la API para traer listas de compras: ", JSON.stringify(request));
        try {
            const response = await expenseMateApi.post<ShoppingResponse>(
                '/api/compra/filter', 
                request
            )
            setShoppingDetailList(response.data.body)
        } catch (error) {
            console.error("ERROR °°°°°°°°°°°° ", error.response.data);
            throw error;
        }

        setIsLoading(false)

    }

    useEffect(() => {
		getShoppingDetail()
	}, [])

    return {
        getShoppingDetail,
        isLoading,
        shoppingDetailList
    }
}
