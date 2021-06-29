import Company from "../Domain/Company";
import Project from "../Domain/Project";

export interface ICompanyStore {
  getCompany: () => Company;
  getCompanyName: () => string;
  getProjects: () => Project[];
}

export default class CompanyStore implements ICompanyStore {
  private company: Company | undefined;

  constructor() {
    this.MakeFakeData();
  }

  public getCompany() {
    return this.company ?? new Company();
  }

  public getCompanyName() {
    return this.company?.Name ?? "";
  }

  public getProjects() {
    return this.company?.Projects ?? ([] as Project[]);
  }

  private MakeFakeData() {
    var project = new Project();
    project.Id = "c7bfad16-c48c-4bbd-b84b-3ebddbc51eb5";
    project.Name = "ENET";
    var project2 = new Project();
    project2.Id = "333d9125-44db-4947-90ec-0e0bc246f083";
    project2.Name = "WorkItem Tracker";
    this.company = {
      Name: "EBSCO",
      Id: "7600d33a-fef2-4bd4-8eae-bf8b2949cdcb",
      Projects: [project, project2],
    };
  }
}
