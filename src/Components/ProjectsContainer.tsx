import React from "react";
import MasterStoreContext from "../Contexts/MasterStoreContext";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Grid, Typography } from "@material-ui/core";
import { getStyle } from "../Styles/AppStyle";

export interface IProjectsContainer {
  showProjectDeployments: (projectId: string) => void;
}

const useStyles = getStyle();

const ProjectsContainer: React.FC<IProjectsContainer> = observer((props: IProjectsContainer) => {
  const stores = useContext(MasterStoreContext);
  const classes = useStyles();

  const callOnShowProjectDeployment = (projectId: string) => {
    stores?.projectStore.getProject(projectId);
    props.showProjectDeployments(projectId);
  };

  return (
    <Grid container style={{ padding: "1em" }}>
      <Grid item xs={12} style={{ textAlign: "left" }}>
        <Typography variant="h5">Projects</Typography>
      </Grid>
      <Grid item style={{ textAlign: "left", padding: "1em" }}>
        {stores?.companyStore.getProjects().map((p) => {
          return (
            <Typography variant="body1" className={classes.hoverStuff} onClick={() => callOnShowProjectDeployment(p.Id)} key={p.Id}>
              {p.Name}
            </Typography>
          );
        })}
      </Grid>
    </Grid>
  );
});

export default ProjectsContainer;
