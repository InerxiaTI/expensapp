export interface CreateCategoryRequest {
	idUsuarioCreador: number;
	nombre:           string;
	esPrivada:        boolean;
}

export interface CreateCategoryResponse {
	description: string;
	message:     string;
	body:        Category;
}

export interface Category {
	id:               number;
	nombre:           string;
	esPrivada:        boolean;
	usuarioCreadorId: number;
	createdDate:      string;
	lastUpdate:       string;
}

// Generated by https://quicktype.io

export interface CategoriesFilterRequest {
	idUsuarioCreador: number;
	nombre?:           string;
	esPrivada?:        boolean;
}

export interface EditCategoryRequest {
	idCategoria: number;
	nombre:      string;
	esPrivada:   boolean;
}

export interface AddCategoryParams {
	editCategoryRequest?: EditCategoryRequest,
}