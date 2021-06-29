import React, { useEffect, useState } from "react";
import MasterStoreContext from "../Contexts/MasterStoreContext";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Grid } from "@material-ui/core";
import DeploymentsContainer from "./DeploymentsContainer";
import ProjectsContainer from "./ProjectsContainer";

export interface IDashboard {}

const Dashboard: React.FC<IDashboard> = observer((props: IDashboard) => {
  const stores = useContext(MasterStoreContext);
  const [currentProjectId, setCurrentProjectId] = useState("");
  const showProjectDeployments = (projectId: string) => {
    setCurrentProjectId(projectId);
    stores?.projectStore.getDeployments();
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container>
      <Grid item xs={2}>
        <ProjectsContainer showProjectDeployments={showProjectDeployments} />
      </Grid>
      <Grid item xs={10}>
        <DeploymentsContainer projectId={currentProjectId} />
      </Grid>
    </Grid>
  );
});

export default Dashboard;
