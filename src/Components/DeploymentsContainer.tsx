import React, { useEffect, useState } from "react";
import MasterStoreContext from "../Contexts/MasterStoreContext";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import Deployment from "../Domain/Deployment";

export interface IDeploymentsContainer {
  projectId: string;
}

const DeploymentsContainer: React.FC<IDeploymentsContainer> = observer((props: IDeploymentsContainer) => {
  const stores = useContext(MasterStoreContext);
  const [currentDeploymentList, setCurrentDeploymentList] = useState([] as Deployment[]);

  useEffect(() => {
    var project = stores?.projectStore.getProject(props.projectId)!;
    setCurrentDeploymentList(project ? project.Deployments : ([] as Deployment[]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.projectId]);

  return (
    <React.Fragment>
      <Grid container style={{ paddingRight: "1em", paddingTop: "1em" }}>
        <Grid item xs={12}>
          {props.projectId !== "" && (
            <Paper elevation={5} style={{ height: "20em" }}>
              <Grid container style={{ paddingLeft: "1em", paddingTop: "1em" }}>
                <Grid item xs={12} style={{ textAlign: "left" }}>
                  <Typography variant="h5">Deployments</Typography>
                </Grid>
                <Grid item>
                  {currentDeploymentList.map((dep) => {
                    return (
                      <Typography variant="body1" key={dep.Id}>
                        {dep.DateCreated.toLocaleDateString()} - {dep.CurrentStage?.Name}
                      </Typography>
                    );
                  })}
                </Grid>
              </Grid>
            </Paper>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
});

export default DeploymentsContainer;
