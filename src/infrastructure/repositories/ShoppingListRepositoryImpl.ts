import { GetShoppingListReq } from "../../application/useCases/getShoppingList";
import { ShoppingList } from "../../domain/entities/ShoppingList";
import { User } from "../../domain/entities/User";
import { ShoppingListRepository } from "../../domain/repositories/ShoppingListRepository";
import { ShoppingListService } from "../services/ShoppingListService";

export class ShoppingListRepositoryImpl implements ShoppingListRepository {


    constructor(private shoppingListService: ShoppingListService){}

    async getShoppingList(user: User, pageable: any): Promise<ShoppingList[]> {

        const body: GetShoppingListReq = {
            user: user,
            pageable: pageable
        }

        const shoppingList = await this.shoppingListService.getShoppingList(body)
        return shoppingList.body.content
    }
    
}