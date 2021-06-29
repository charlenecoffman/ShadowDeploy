import React, { useEffect } from "react";
import MasterStoreContext from "../Contexts/MasterStoreContext";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { AppBar, Grid, Typography } from "@material-ui/core";
import { getStyle } from "../Styles/AppStyle";
import { onAuthUIStateChange } from "@aws-amplify/ui-components";
const useStyles = getStyle();

export interface INavbar {}

const Navbar: React.FC<INavbar> = observer((props: INavbar) => {
  const stores = useContext(MasterStoreContext);
  const [authState, setAuthState] = React.useState("signedin");
  const classes = useStyles();

  useEffect(() => {
    return onAuthUIStateChange((newAuthState: any) => {
      setAuthState(newAuthState);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const SignOutClick = () => {
    stores?.authStore.signOutUser().then(() => {
      setAuthState("signin");
    });
  };

  return (
    <React.Fragment>
      <Grid container>
        <AppBar position="sticky" style={{ background: "transparent", boxShadow: "none" }}>
          <Grid item xs={12} className={classes.AppHeader}>
            <Grid container>
              <Grid item xs={10} style={{ textAlign: "left", paddingLeft: "1em" }}>
                <Typography variant="h3">Shadow Deploy</Typography>
              </Grid>
              {authState === "signedin" && (
                <Grid item xs={2} onClick={SignOutClick} style={{ textAlign: "right", paddingRight: "1em", paddingTop: "1em" }}>
                  <Typography variant="body1">Sign Out</Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </AppBar>
      </Grid>
    </React.Fragment>
  );
});

export default Navbar;
