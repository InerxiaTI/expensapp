import axios, { AxiosRequestConfig } from "axios";
import CONFIGS from "../config/config";
import { errorLog, infoLog } from "../utils/HandlerError";
import { getCurrentRoute, reset } from "../navigation/servicesUtil/NavigationService";



const expenseMateApi = axios.create({
    baseURL: CONFIGS.EXPENSEMATE.BASE_URL,
    timeout: CONFIGS.REQUEST_TIMEOUT_MS
})


const redirect = () => {
    infoLog(`Route: ${JSON.stringify(getCurrentRoute())}`)

    infoLog("Antes navi")

    reset(1, 'ErrorInesperado', {'test': true})
    
}

// Permite interceptar las request y hacer algo con ellas. 
const requestHandler = (request) => {

    try {

        console.log("LOGF9 request detail");
        console.log("LOGF9 Method: " + request.method);
        console.log("LOGF9 More: ", JSON.stringify(request));

        return request;

    } catch (error) {
        console.log("LOGF9 interceptor error , reportar error, error: " + error);
        throw error;
    }

}

const requestErrorHandler = (error) => {
    console.log("LOGF9 INTERCEPTOR REQUEST ERROR");


    console.log("LOGF9 request, error: " + error);

    return Promise.reject(error)
}



expenseMateApi.interceptors.request.use(requestHandler, requestErrorHandler)


const responseHandler = (response) => {
    try {
        console.log("LOGF9 EN INTERCEPTOR RESPONSE SUCCESS: " + JSON.stringify(response));

        // Si la respuesta es exitosa la devolvemos o podemos 
        // tener mecanismo de encriptación y por tanto querer desencriptar la respuesta
        return response;
    } catch (error) {

        throw error

    }
}

const responseErrorHandler = (error) => {

    infoLog("====================================");
    infoLog("==== INTERCEPTOR RESPONSE ERROR ====");
    infoLog("====================================");
    infoLog(`URL: ${error.config?.baseURL}${error.config?.url}`);
    infoLog(`METHOD: ${error.config?.method}`)
    infoLog(`Message: ${error.message}`)
    infoLog(`Axios: ${error}`)
    infoLog("====================================");

    // Aquí puedes manejar los errores de respuesta
    if (error.response) {
        const errorMate = error.response.data;

        infoLog(`STATUS: ${errorMate.status}`)
        infoLog(`Message: ${errorMate.message}`)

        if (error.response.status === 400) {
            console.log("LOGF9 ES JODIDO");
            redirect()
            // Acciones necesarias para llamar pantalla de error, o para mostrar modal de error.
            //throw new Error('Ha ocurrido un error inesperado. Por favor, inténtelo de nuevo más tarde.');
        } else {
            console.log("LOGF9 AQUI EN NO 500S");

            throw error;
        }
    } else if (error.request) {
        // Si la solicitud no pudo ser realizada (por ejemplo, problemas de red)
        errorLog('Error de solicitud:', error);

    } else {
        // Error inesperado
        errorLog('Error inesperado:', error);
    }

    infoLog("antes del REJECT del RESPONSE ERROR");

    return Promise.reject(error)
}

// Interceptor para manejar errores de respuesta
expenseMateApi.interceptors.response.use(
    responseHandler,
    responseErrorHandler
);


export default expenseMateApi;