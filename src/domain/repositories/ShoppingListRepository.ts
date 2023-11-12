import { ShoppingList } from "../entities/ShoppingList";
import { User } from "../entities/User";


export interface ShoppingListRepository {

    getShoppingList(user: User, pageable: any): Promise<ShoppingList[]>
}