import { GetShoppingListReq, GetShoppingListRes } from "../../application/useCases/getShoppingList";
import { ShoppingList } from "../../domain/entities/ShoppingList";
import { HttpManager } from "../network/http";


export class ShoppingListService {

    constructor(private http: HttpManager) {}

    async getShoppingList(body: GetShoppingListReq): Promise<GetShoppingListRes> {

        const reponse = await this.http.post('/api/lista-compra/filter', body.user, body.pageable)
        return reponse!.data

    }


}