import React, { ReactNode, useState, useContext } from "react";
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn } from "@aws-amplify/ui-react";
import { onAuthUIStateChange } from "@aws-amplify/ui-components";
import Amplify from "aws-amplify";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import MasterStoreContext from "../Contexts/MasterStoreContext";

Amplify.configure({
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_oZNUXMCqP",
    userPoolWebClientId: "71amhlds37l02eacg96hd03eop",
  },
});

export interface IAuthenticationProps {
  children: ReactNode;
  signInMessage?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    message: {
      [theme.breakpoints.down("md")]: {
        paddingTop: "2em",
        paddingBottom: "2em",
      },
      [theme.breakpoints.up("md")]: {
        paddingTop: "2em",
        paddingBottom: "2em",
        paddingLeft: "20em",
        paddingRight: "20em",
      },
    },
  }),
);

const Authentication: React.FC<IAuthenticationProps> = observer((props) => {
  const classes = useStyles();
  const [authState, setAuthState] = useState("");
  const stores = useContext(MasterStoreContext);

  stores?.authStore
    .getAuthenticatedUser()
    .then((user) => {
      if (user) {
        setAuthState("signedin");
      }
    })
    .catch((error) => {
      //do nothing
    });

  React.useEffect(() => {
    return onAuthUIStateChange((newAuthState: any) => {
      setAuthState(newAuthState);
    });
  }, []);

  return (
    <div>
      {authState !== "signedin" && (
        <Grid item xs={12} className={classes.message}>
          {props.signInMessage}
        </Grid>
      )}
      <AmplifyAuthenticator usernameAlias="email">
        <AmplifySignIn usernameAlias="email" slot="sign-in" />
        <AmplifySignUp usernameAlias="email" slot="sign-up" formFields={[{ type: "email" }, { type: "password" }]}></AmplifySignUp>
        {authState === "signedin" && <div>{props.children}</div>}
        <div style={{ width: "25%" }}></div>
      </AmplifyAuthenticator>
    </div>
  );
});

export default Authentication;
