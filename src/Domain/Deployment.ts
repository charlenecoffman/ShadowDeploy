import Stage from "./Stage";

export default class Deployment {
  Id: string = "";
  DateCreated: Date = new Date();
  DateComplete?: Date;
  CurrentStage?: Stage;
  Stages: Stage[] = [];
}
