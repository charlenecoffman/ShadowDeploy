import CustomData from "./CustomData";
import Deployment from "./Deployment";

export default class Deployable {
  Id: string = "";
  Name: string = "";
  CustomData: CustomData[] = [];
  Deployment: Deployment = new Deployment();
}
