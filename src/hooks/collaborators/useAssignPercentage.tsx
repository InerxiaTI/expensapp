import { useState } from "react"
import { JoinShoppingList } from "../../interfaces/ShoppingInterface"
import { AssignPercentageCollaboratorRequest } from "../../interfaces/UserInterface"
import { updatePercentage } from "../../services/collaboratorService"


export const useAssignPercentage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [assignPercentageCollaborator, setAssignPercentageCollaborator] = useState<JoinShoppingList>()


    const saveAssignPercentageCollaborator = async (assignRequest: AssignPercentageCollaboratorRequest) => {

        try {
            const response = await updatePercentage(assignRequest)
            console.log("response: "+JSON.stringify(response));
            
            setAssignPercentageCollaborator(response)
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