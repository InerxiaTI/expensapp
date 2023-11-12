export class ShoppingList {
    id: number;
    name: string;
    status: string;
    creationDate: string;
    endDate?: string;
    totalPurchase: string;
    idUserCreator: number;
    generatedCode: string;
  
    constructor(
      id: number,
      name: string,
      status: string,
      creationDate: string,
      totalPurchase: string,
      idUserCreator: number,
      generatedCode: string,
      endDate?: string
    ) {
      this.id = id;
      this.name = name;
      this.status = status;
      this.creationDate = creationDate;
      this.endDate = endDate;
      this.totalPurchase = totalPurchase;
      this.idUserCreator = idUserCreator;
      this.generatedCode = generatedCode;
    }
  }
  