import Deployment from "../Domain/Deployment";
import Project from "../Domain/Project";
import Stage from "../Domain/Stage";
import { v4 as uuidv4 } from "uuid";
import { action, observable } from "mobx";

export interface IProjectStore {
  getProject: (projectId: string) => Project;
  getDeployments: () => Deployment[];
}

export default class ProjectStore implements IProjectStore {
  @observable private project: Project | undefined;
  private projectDB: Project[] = [] as Project[];
  constructor() {
    this.MakeFakeProjectData();
  }

  @action
  public getProject(projectId: string) {
    if (this.project?.Id !== projectId) {
      this.project = this.projectDB.find((p) => p.Id === projectId)!;
    }
    return this.project;
  }

  public getDeployments() {
    return this.project?.Deployments ?? ([] as Deployment[]);
  }

  private MakeFakeProjectData() {
    var project1 = new Project();
    project1.Id = "c7bfad16-c48c-4bbd-b84b-3ebddbc51eb5";
    project1.Name = "ENET";
    var deployment = new Deployment();
    deployment.Id = uuidv4();
    deployment.DateCreated = new Date();
    deployment.CurrentStage = new Stage();
    deployment.CurrentStage.Name = "Awaiting Deployment";
    project1.Deployments.push(deployment);
    this.projectDB.push(project1);
    var project2 = new Project();
    project2.Id = "333d9125-44db-4947-90ec-0e0bc246f083";
    project2.Name = "WorkItemTracker";
    var deployment2 = new Deployment();
    deployment2.Id = uuidv4();
    deployment2.DateCreated = new Date();
    deployment2.CurrentStage = new Stage();
    deployment2.CurrentStage.Name = "Executing Deployment";
    project2.Deployments.push(deployment2);
    this.projectDB.push(project2);
  }
}
