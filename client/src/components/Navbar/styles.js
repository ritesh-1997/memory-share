import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",
  },
  heading: {
    color: "rgba(0,183,255, 1)",
    textDecoration: "none",
  },
  image: {
    marginLeft: "15px",
    display: "flex",
    justifyContent: "flex",
    alignItems: "center",
    aligncontent: "space-between",
    width: "10px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "flex",
    aligncontent: "space-between",
    width: "300px",
    position: "relative",
  },
  profile: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "300px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  logout: {
    display: "flex",
    justifyContent: "flex",
    alignItems: "right",
    background: "lightblue" /* Green */,
    border: "none",
    color: "white",
    padding: "  15px",
    textalign: "center",
    textdecoration: "none",
    display: "inline-block",
    fontsize: "16px",
  },
}));
