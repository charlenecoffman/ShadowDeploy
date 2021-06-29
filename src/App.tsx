import { getStyle } from "./Styles/AppStyle";
import MasterStoreContext from "./Contexts/MasterStoreContext";
import MasterStore from "./Stores/MasterStore";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import { createBrowserHistory } from "history";
import Authentication from "./Components/Authentication";
import Navbar from "./Components/Navbar";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#92288F",
      light: "#da9101",
      contrastText: "#FFF",
    },
    secondary: {
      contrastText: "#FEC440",
      main: "#fed337",
      light: "#E8E9EB",
    },
    warning: {
      main: "#dedede",
    },
  },
  typography: {
    fontFamily: ['"Avenir"', "sans-serif"].join(","),
    fontSize: 18,
  },
});

const useStyles = getStyle();

function App() {
  const history = createBrowserHistory();
  const classes = useStyles();
  // eslint-disable-next-line no-restricted-globals
  const path = (/#!(\/.*)$/.exec(location.hash) || [])[1];
  if (path) {
    history.replace(path);
  }

  return (
    <MasterStoreContext.Provider value={new MasterStore()}>
      <div className={classes.App}>
        <Router>
          <ThemeProvider theme={theme}>
            <Navbar />
            <Switch>
              <Route exact path="/">
                <Authentication>
                  <Dashboard />
                </Authentication>
              </Route>
            </Switch>
          </ThemeProvider>
        </Router>
      </div>
    </MasterStoreContext.Provider>
  );
}

export default App;
