import { ExecutionStatus } from "./ExecutionStatus";

export default class Stage {
  Id: string = "";
  Name: string = "";
  DateExecuted: Date = new Date();
  ExecutionStatus: ExecutionStatus = ExecutionStatus.NotStarted;
  RequiresSigning: boolean = false;
}
