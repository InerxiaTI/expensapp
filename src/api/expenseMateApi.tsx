import axios, { AxiosRequestConfig } from "axios";
import CONFIGS from "../config/config";

const expenseMateApi = axios.create({
    baseURL: CONFIGS.EXPENSEMATE.BASE_URL,
    timeout: CONFIGS.REQUEST_TIMEOUT_MS
})

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
    console.log("LOGF9 INTERCEPTOR RESPONSE ERROR");
    
    // Aquí puedes manejar los errores de respuesta
    if (error.response) {
        // Si hay una respuesta del servidor con un código de estado diferente de 2xx,
        // puedes acceder al código de estado y al mensaje de error si está disponible.
        console.log('LOGF9 Código de estado de error:', error.response.status);
        console.log('LOGF9 Mensaje de error:', JSON.stringify(error));

        // Puedes lanzar el error nuevamente o mostrar un mensaje genérico al usuario
        // throw error;
        if (error.response.status === 500) {
            console.log("LOGF9 ES JODIDO");

            //throw new Error('Ha ocurrido un error inesperado. Por favor, inténtelo de nuevo más tarde.');
        } else {
            console.log("LOGF9 AQUI EN NO 500S");

            throw error;
        }
    } else if (error.request) {
        // Si la solicitud no pudo ser realizada (por ejemplo, problemas de red)
        console.error('LOGF9 Error de solicitud:', error.request);

    } else {
        // Error inesperado
        console.error('LOGF9 Error inesperado:', error.message);
    }

    console.log("LOGF9 antes del REJECT del RESPONSE ERROR");
    
    return Promise.reject(error)
}

// Interceptor para manejar errores de respuesta
expenseMateApi.interceptors.response.use(
    responseHandler,
    responseErrorHandler
);


export default expenseMateApi;