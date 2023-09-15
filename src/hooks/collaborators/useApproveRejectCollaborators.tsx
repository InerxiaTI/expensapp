import { useState } from "react"
import { JoinShoppingList } from "../../interfaces/ShoppingInterface"
import { ApproveRejectCollaboratorRequest } from "../../interfaces/UserInterface"
import { approveRejectCollaboratorRequest } from "../../services/collaboratorService"


export const useApproveRejectCollaborators = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [joinShoppingList, setJoinShoppingList] = useState<JoinShoppingList>()


    const saveApproveRejectCollaborator = async (approveRejectRequest: ApproveRejectCollaboratorRequest) => {

        try {
            const response = await approveRejectCollaboratorRequest(approveRejectRequest)
            console.log("response: "+JSON.stringify(response));
            
            setJoinShoppingList(response)
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
