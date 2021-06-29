import { makeStyles, createStyles, Theme } from "@material-ui/core";

export function getStyle() {
  return makeStyles((theme: Theme) =>
    createStyles({
      App: {
        textAlign: "center",
      },
      AppHeader: {
        backgroundColor: "#282c34",
        color: "white",
      },
      hoverStuff: {
        "&:hover": {
          textDecoration: "underline",
          cursor: "pointer",
        },
      },
    }),
  );
}
