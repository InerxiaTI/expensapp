import { CategoriesFilterRequest, Category, CreateCategoryRequest, CreateCategoryResponse, EditCategoryRequest } from "../../interfaces/CategoriesInterface";
import { GenericResponse } from "../../interfaces/ShoppingInterface";
import { User } from "../../interfaces/UserInterface";
import { errorLog, infoLog } from "../../utils/HandlerError";
import expenseMateApi from "../api/expenseMateApi";

const getCategories = async (request: CategoriesFilterRequest, pageable: any) => {
	infoLog("LLamando a la API para traer listas de categorias");
	try {
		const response = await expenseMateApi.post<GenericResponse<Category>>(
			'/categoria/filter',request,
			{
				params: {
					page: pageable.currentPage,
					size: pageable.size,
					sort: 'id,DESC'
				}
			}
		)
		return response.data.body
	} catch (error) {
		errorLog("Error direct on fetch categories", error);
		throw error;
	}
}

const createCategory = async (request: CreateCategoryRequest) => {
	console.log("LLamando a la API para crear Categoria");
	try {
		const response = await expenseMateApi.post<CreateCategoryResponse>(
			'/categoria/crear-categoria',
			request
		)
		console.log("response save CATEGORY: " + JSON.stringify(response.data.body));
		return response.data.body
	} catch (error) {
		throw error;
	}

}

const editCategory = async (request: EditCategoryRequest) => {
	console.log("LLamando a la API para editar Categoria");
	try {
		const response = await expenseMateApi.put<CreateCategoryResponse>(
			'/categoria/editar-categoria',
			request
		)
		console.log("response edit CATEGORY: " + JSON.stringify(response.data.body));
		return response.data.body
	} catch (error) {
		throw error;
	}

}

export {
	getCategories,
	createCategory,
	editCategory
}