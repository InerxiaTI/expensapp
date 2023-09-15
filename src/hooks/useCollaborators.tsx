import { useContext, useState, useEffect } from "react";
import expenseMateApi from "../api/expenseMateApi";
import { AuthContext } from "../context/AuthContext";
import { Collaborator, CollaboratorsFilterRequest, CollaboratorsFilterResponse, ApproveRejectCollaboratorRequest, AssignPercentageCollaboratorRequest } from '../interfaces/UserInterface';
import { JoinsShoppingListResponse, JoinShoppingList } from '../interfaces/ShoppingInterface';


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


export const useAssignPercentage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [assignPercentageCollaborator, setAssignPercentageCollaborator] = useState<JoinShoppingList>()


    const saveAssignPercentageCollaborator = async (assignRequest: AssignPercentageCollaboratorRequest) => {

        try {
            const response = await expenseMateApi.post<JoinsShoppingListResponse>(
                '/api/lista-compra/asignar-porcentaje-colaborador', 
                assignRequest
            )
            console.log("response: "+JSON.stringify(response.data.body));
            
            setAssignPercentageCollaborator(response.data.body)
        } catch (error) {
            console.error("ERROR °°°°°°°°°°°° ", error.response.data);
            throw error;
        }

        setIsLoading(false)
    }


    return {
        isLoading,
        setIsLoading,
        assignPercentageCollaborator,
        saveAssignPercentageCollaborator
    }
}