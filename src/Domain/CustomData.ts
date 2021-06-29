import { DataType } from "./DataType";

export default class CustomData {
  Id: string = "";
  Name: string = "";
  Value: any = {};
  DataType: DataType = DataType.String;
  OrderSequence: number = 0;
}
