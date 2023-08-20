// Generated by https://quicktype.io

import { Collaborator } from "./UserInterface";

export interface ShoppingListsResponse {
    status: number;
    body:   ShoppingList[];
    message?: string;
}

export interface CreateShoppingListResponse {
    status: number;
    body:   ShoppingList;
    message?: string;
}

export interface ShoppingList {
    id:              number;
    nombre:          string;
    estado:          string;
    fechaCreacion:   string;
    fechaFinalizado?: string;
    totalCompras:    string;
    usuarioCreador:  number;
    codigoGenerado:  string;
}

// Generated by https://quicktype.io

export interface CreateShoppingListRequest {
    nombre:         string;
    usuarioCreador: number;
}


// Generated by https://quicktype.io

export interface ShoppingRequest {
    idListaCompras:  number;
    idUsuarioCompra: number;
    categoria?:       string;
    descripcion?:     string;
}


// Generated by https://quicktype.io

export interface ShoppingResponse {
    status: number;
    body:   Shopping[];
}

export interface Shopping {
    id:                       number;
    descripcion:              string;
    valor:                    string;
    nombreCategoria:          string;
    nombresUsuarioCompra:     string;
    apellidosUsuarioCompra:   string;
    nombresUsuarioRegistro:   string;
    apellidosUsuarioRegistro: string;
    idListaCompra:            number;
    idCategoria:              number;
    idUsuarioCompra:          number;
    idUsuarioRegistro:        number;
    fechaCompra:              string;
    fechaCreacion:            string;
}


// crear compra

export interface AddExpenseParams {
    createShoppingRequest?: CreateShoppingRequest;
    collaborator?: Collaborator;
}

// Generated by https://quicktype.io

export interface CreateShoppingRequest {
    idListaCompras:    number; //LT
    idCategoria:       number; //QLT
    idUsuarioCompra:   number; //LT user logueado temporalment
    idUsuarioRegistro: number; //LT user logueado
    fechaCompra?:       string;
    valor?:             number;
    descripcion?:       string;
}

// Generated by https://quicktype.io

export interface CreateShoppingResponse {
    status:  number;
    message: string;
    body:    CreateShopping;
}

export interface CreateShopping {
    listaCompraFk:     number;
    categoriaFk:       number;
    usuarioCompraFk:   number;
    usuarioRegistroFk: number;
    fechaCompra:       string;
    descripcion:       string;
    valor:             number;
    fechaCreacion:     string;
    id:                number;
}


// Unirse lista de compras para


// Generated by https://quicktype.io

export interface JoinShoppingListRequest {
    codigoGenerado:       string;
    idUsuarioColaborador: number;
}


// Generated by https://quicktype.io

export interface JoinsShoppingListResponse {
    status: number;
    body:   JoinShoppingList;
}

export interface JoinShoppingList {
    listaCompraFk: number;
    usuarioFk:     number;
    estado:        string;
    esCreador:     boolean;
    porcentaje:    null;
    id:            number;
}








