import expenseMateApi from "../api/expenseMateApi";
import { CollaboratorsFilterRequest, CollaboratorsFilterResponse } from "../interfaces/UserInterface";


const getCollaborators = async (request: CollaboratorsFilterRequest) => {
    try {
        const response = await expenseMateApi.post<CollaboratorsFilterResponse>(
            '/api/lista-compra/filter-integrantes', 
            request
        )
       return response.data.body
          
    } catch (error) {
        console.error("ERROR °°°°°°°°°°°° ", error.response.data);
        throw error;
    }
}


export {
    getCollaborators
}