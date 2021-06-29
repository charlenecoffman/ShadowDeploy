import User from "../Domain/User";
import { observable, action } from "mobx";
import { Auth } from "aws-amplify";
import { UserGroup } from "../Domain/UserGroup";

export interface IAuthenticationStore {
  getAuthenticatedUser: () => Promise<User>;
  signOutUser: () => Promise<void>;
  currentUser: User | undefined;
}

export default class AuthenticationStore implements IAuthenticationStore {
  @observable public currentUser: User | undefined;

  @action
  public async getAuthenticatedUser() {
    if (this.currentUser) {
      return this.currentUser!;
    } else {
      await Auth.currentAuthenticatedUser()
        .then((user: any) => {
          if (user) {
            this.currentUser = new User();
            var groups = user.signInUserSession.accessToken.payload["cognito:groups"];
            if (groups && groups.indexOf(UserGroup[UserGroup.Admin]) > -1) {
              this.currentUser.UserGroup = UserGroup.Admin;
            } else if (groups && groups.indexOf(UserGroup[UserGroup.DeploymentConductor]) > -1) {
              this.currentUser.UserGroup = UserGroup.DeploymentConductor;
            } else if (groups && groups.indexOf(UserGroup[UserGroup.DeployableOwner]) > -1) {
              this.currentUser.UserGroup = UserGroup.DeployableOwner;
            } else {
              this.currentUser.UserGroup = UserGroup.ReadOnly;
            }
            this.currentUser.Id = user.attributes.sub;
            this.currentUser.IdToken = user.signInUserSession.idToken.jwtToken;
            this.currentUser.AccessToken = user.signInUserSession.accessToken.jwtToken;
          }
        })
        .catch((err: any) => {});
    }

    return this.currentUser!;
  }

  public async signOutUser() {
    this.currentUser = undefined;
    return Auth.signOut();
  }
}
