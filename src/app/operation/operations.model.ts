import { Product } from "../categoryproduct/product/product.model";

export class Operation {
  constructor(
    public id: number,
    public date: Date,
    public netTotal: number,
    public grossTotal: number,
    public discountTotal: number,
    public taxTotal: number,
    public typeOperationId: number,
    public Items:OperationDetail[]
  ) {}
}
export class OperationDetail{
  constructor(public  quantity: number,public itemId: number,public  operationId: number){}
}
