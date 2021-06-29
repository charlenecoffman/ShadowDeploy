import CompanyStore from "./CompanyStore";
import AuthenticationStore from "./AuthenticationStore";
import ProjectStore from "./ProjectStore";

import { makeAutoObservable } from "mobx";

export default class MasterStore {
  constructor() {
    makeAutoObservable(this);
    this.authStore.getAuthenticatedUser();
  }
  public authStore = new AuthenticationStore();
  public companyStore = new CompanyStore();
  public projectStore = new ProjectStore();
}
