import expenseMateApi from "../api/expenseMateApi";
import { CreateShoppingListRequest, CreateShoppingListResponse, ShoppingListsResponse } from "../interfaces/ShoppingInterface";
import { User } from "../interfaces/UserInterface";


const getShoppingLists = async (user: User) => {
	console.log("LLamando a la API para traer listas de compras");
	try {
		const response = await expenseMateApi.get<ShoppingListsResponse>(
			'/api/lista-compra/filter',
			{
				params: {
					usuario: user.id,
				}
			}
		)
		return response.data.body
	} catch (error) {
		console.error(error);
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
			console.log("response NEW SHOPPING LIST: "+JSON.stringify(response.data.body));
			return response.data.body
	} catch (error) {
			console.error(error);
			throw error;
	}

}

export {
	getShoppingLists,
	saveShoppingList
}