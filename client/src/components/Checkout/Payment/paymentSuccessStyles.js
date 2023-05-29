import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: theme.spacing(2),
  },
  successIcon: {
    fontSize: 100,
    color: theme.palette.success.main,
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));
