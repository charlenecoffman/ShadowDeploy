import Deployment from "./Deployment";
import ProjectSetting from "./ProjectSetting";

export default class Project {
  Id: string = "";
  Name: string = "";
  Deployments: Deployment[] = [];
  DefaultSettings: ProjectSetting[] = [];
}
