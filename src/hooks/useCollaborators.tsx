import { useContext, useState, useEffect } from "react";
import expenseMateApi from "../api/expenseMateApi";
import { AuthContext } from "../context/AuthContext";
import { Collaborator, CollaboratorsFilterRequest, CollaboratorsFilterResponse, ApproveRejectCollaboratorRequest } from '../interfaces/UserInterface';
import { JoinsShoppingListResponse, JoinShoppingList } from '../interfaces/ShoppingInterface';



export const useCollaboratorsV2 = (idShoppingList: number) => {
    const {authState} = useContext(AuthContext);
    console.log("$$$$$$$$$$$$$ auth useShoppingDetail: ", authState.user);
    const userLogged = authState.user

    const [isLoading, setIsLoading] = useState(true)
    const [collaborators, setCollaborators] = useState<Collaborator[]>([])

    const getCollaborators = async (idShoppingList: number) => {

        console.log("################### isl: ", idShoppingList);
        

        const request: CollaboratorsFilterRequest = {
            idListaCompras: idShoppingList,
        }

        console.log("RR LLamando a la API para traer listas de colaboradores: ", JSON.stringify(request));
        try {
            const response = await expenseMateApi.post<CollaboratorsFilterResponse>(
                '/api/lista-compra/filter-integrantes', 
                request
            )
            console.log("------------------- collaboradores: ", JSON.stringify(response.data.body));

            response.data.body.sort((a, b) => {
                if (a.idUsuario === userLogged?.id) {
                  return -1; // Coloca a primero si a es el usuario logueado
                }
                if (b.idUsuario === userLogged?.id) {
                  return 1; // Coloca b primero si b es el usuario logueado
                }
                return 0; // Mantén el orden actual si ninguno es el usuario logueado
              });
              
            setCollaborators(response.data.body)
        } catch (error) {
            console.error("ERROR °°°°°°°°°°°° ", error.response.data);
            throw error;
        }

        setIsLoading(false)

    }

    const reloadCollaborators = async () => {
        setIsLoading(true);
        await getCollaborators(idShoppingList);
        setIsLoading(false);
      };

    useEffect(() => {
		getCollaborators(idShoppingList)
	}, [])

    return {
        setCollaborators,
        getCollaborators,
        reloadCollaborators,
        isLoading,
        collaborators
    }
}

export const useApproveRejectCollaborators = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [joinShoppingList, setJoinShoppingList] = useState<JoinShoppingList>()


    const saveApproveRejectCollaborator = async (approveRejectRequest: ApproveRejectCollaboratorRequest) => {

        try {
            const response = await expenseMateApi.post<JoinsShoppingListResponse>(
                '/api/lista-compra/aprobar-rechazar-colaborador', 
                approveRejectRequest
            )
            console.log("response: "+JSON.stringify(response.data.body));
            
            setJoinShoppingList(response.data.body)
        } catch (error) {
            console.error("ERROR °°°°°°°°°°°° ", error.response.data);
            throw error;
        }

        setIsLoading(false)
    }


    return {
        isLoading,
        setIsLoading,
        joinShoppingList,
        saveApproveRejectCollaborator
    }
}