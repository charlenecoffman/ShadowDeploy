import { UserGroup } from "./UserGroup";

export default class User {
  Id: string = "";
  CompanyId: string = "";
  UserGroup: UserGroup = UserGroup.ReadOnly;
  IdToken: string = "";
  AccessToken: string = "";
}
