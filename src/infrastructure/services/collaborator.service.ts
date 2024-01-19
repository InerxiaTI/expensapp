import expenseMateApi from "../api/expenseMateApi";
import { JoinsShoppingListResponse } from "../../interfaces/ShoppingInterface";
import { CollaboratorsFilterRequest, CollaboratorsFilterResponse, ApproveRejectCollaboratorRequest, AssignPercentageCollaboratorRequest } from '../../interfaces/UserInterface';

//TODO agregar nombre y apellido en la response (back)
const getCollaborators = async (request: CollaboratorsFilterRequest) => {
    try {
        const response = await expenseMateApi.post<CollaboratorsFilterResponse>(
            '/integrante/filter-integrantes-total-compras',
            request
        )
       return response.data.body

    } catch (error) {
        console.error("ERROR °°°°°°°°°°°° ", error.response.data);
        throw error;
    }
}

const approveRejectCollaboratorRequest = async (approveRejectRequest: ApproveRejectCollaboratorRequest) => {
    try {
        const response = await expenseMateApi.post<JoinsShoppingListResponse>(
            '/integrante/aprobar-rechazar-colaborador',
            approveRejectRequest
        )
        console.log("response: "+JSON.stringify(response.data.body));
        return response.data.body

    } catch (error) {
        console.error("ERROR °°°°°°°°°°°° ", error.response.data);
        throw error;
    }
}

const updatePercentage = async (assignRequest: AssignPercentageCollaboratorRequest) => {
    try {
        const response = await expenseMateApi.post<JoinsShoppingListResponse>(
            '/integrante/asignar-porcentaje-colaborador',
            assignRequest
        )
        console.log("response: "+JSON.stringify(response.data.body));

        return response.data.body

    } catch (error) {
        console.error("ERROR °°°°°°°°°°°° ", error.response.data);
        throw error;
    }
}


export {
    getCollaborators,
    approveRejectCollaboratorRequest,
    updatePercentage
}
