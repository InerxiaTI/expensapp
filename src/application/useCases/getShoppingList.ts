import container from "../../IOCContainer";
import { ShoppingList } from "../../domain/entities/ShoppingList";
import { User } from "../../domain/entities/User";
import { ShoppingListRepository } from "../../domain/repositories/ShoppingListRepository";
import { UseCase } from "../useCase";


interface Pageable {
    currentPage: number,
    size: number,
    totalPages: number
}

export interface GetShoppingListReq {
    user: User;
    pageable: Pageable
}

export interface GetShoppingListRes {
    status: number;
    body:   ShoppingListsBodyResponse;
}

interface ShoppingListsBodyResponse {
    page:          string;
    size:          string;
    content:       ShoppingList[];
    totalElements: number;
    totalPages:    number;
    totalContent:  number;
}


export class GetShoppingListUseCase implements UseCase<GetShoppingListReq, ShoppingList[]> {

    readonly repository: ShoppingListRepository;

    constructor(repository: ShoppingListRepository){
        this.repository = repository;
    }

    run(user: User, page: Pageable): Promise<ShoppingList[]> {
        return this.repository.getShoppingList(user, page);
        
    }
    
}