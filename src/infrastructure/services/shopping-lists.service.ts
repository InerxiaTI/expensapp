import expenseMateApi from "../api/expenseMateApi";
import { CreateShoppingListRequest, CreateShoppingListResponse, CreateShoppingRequest, CreateShoppingResponse, EditShoppingRequest, JoinShoppingListRequest, JoinsShoppingListResponse, ShoppingListsResponse, ShoppingRequest, ShoppingResponse } from "../../interfaces/ShoppingInterface";
import { User } from "../../interfaces/UserInterface";
import { errorLog, infoLog } from "../../utils/HandlerError";

const getShoppingLists = async (user: User, pageable: any) => {
	infoLog("LLamando a la API para traer listas de compras");
	try {
		const response = await expenseMateApi.post<ShoppingListsResponse>(
			'/api/lista-compra/filter',{usuario: user.id},
			{
				params: {
					page: pageable.currentPage,
					size: pageable.size,
					sort: 'id,DESC'
				}
			}
		)
		return response!.data
	} catch (error) {
		errorLog("Error direct on fetch shoping list", error);
		throw error;
	}
}

const saveShoppingList = async (request: CreateShoppingListRequest) => {
	console.log("LLamando a la API para crear lista de compras");
	try {
		const response = await expenseMateApi.post<CreateShoppingListResponse>(
			'/api/lista-compra/crear-lista-compra',
			request
		)
		console.log("response NEW SHOPPING LIST: " + JSON.stringify(response.data.body));
		return response.data.body
	} catch (error) {
		throw error;
	}

}


const getShoppingListDetail = async (request: ShoppingRequest) => {

	console.log("LLamando a la API para traer compras de una lista de compras: ", JSON.stringify(request));
	try {
		const response = await expenseMateApi.post<ShoppingResponse>(
			'/api/compra/filter',
			request
		)
		return response.data.body
	} catch (error) {
		throw error;
	}
}

const createShopping = async (shopping: CreateShoppingRequest) => {
	console.log("LLamando a la API para crear una compra");
	try {
		const response = await expenseMateApi.post<CreateShoppingResponse>(
			'/api/compra/crear-compra',
			shopping
		)

		return response.data.body

	} catch (error) {
		throw error;
	}

}

const editShopping = async (shopping: EditShoppingRequest) => {
	console.log("LLamando a la API para editar una compra");
	try {
		const response = await expenseMateApi.put<CreateShoppingResponse>(
			'/api/compra/editar-compra',
			shopping
		)

		return response.data.body

	} catch (error) {
		throw error;
	}

}


const startShoppingList = async (idListaCompras: number) => {

	try {
		const response = await expenseMateApi.put<CreateShoppingListResponse>(
			`/api/lista-compra/inicializar-lista-compras?idListaCompras=${idListaCompras}`
		)
		console.log("88888888888888888888888888888888\n response: " + JSON.stringify(response.data.body));

		return response.data.body

	} catch (error) {
		throw error;
	}

}


const sendRequestAddCollaborator = async (request: JoinShoppingListRequest) => {

	try {
		const response = await expenseMateApi.post<JoinsShoppingListResponse>(
			'/api/lista-compra/solicitud-agregar-colaborador',
			request
		)
		console.log("response: " + JSON.stringify(response.data.body));
		return response.data.body
	} catch (error) {
		throw error;
	}

}


export {
	getShoppingLists,
	saveShoppingList,
	getShoppingListDetail,
	createShopping,
	startShoppingList,
	sendRequestAddCollaborator,
	editShopping

}
