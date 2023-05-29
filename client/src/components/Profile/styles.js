import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  media: {
    borderRadius: "20px",
    objectFit: "cover",
    width: "100%",
    maxHeight: "600px",
  },
  card: {
    display: "flex",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
      flexDirection: "column",
    },
  },
  section: {
    borderRadius: "20px",
    margin: "10px",
    flex: 1,
  },
  imageSection: {
    marginLeft: "20px",
    display: "flex",
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  loadingPaper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    height: "39vh",
  },
  CommentsOuterSection: {
    display: "flex",
    justifyContent: "space-between",
    height: "200px",
  },
  CommentsInnerSection: {
    height: "200px",
    overflowY: "overflow",
    marginRight: "30px",
  },
  root: {
    backgroundColor: theme["color-basic-100"],
    marginTop: 60,
  },
  header: {
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 17,
  },
  userInfo: {
    flexDirection: "row",
    paddingVertical: 18,
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: theme["color-basic-400"],
  },
  section: {
    flex: 1,
    alignItems: "center",
  },
  space: {
    marginBottom: 3,
    color: theme["color-basic-1000"],
  },
  separator: {
    backgroundColor: theme["color-basic-400"],
    alignSelf: "center",
    flexDirection: "row",
    flex: 0,
    width: 1,
    height: 42,
  },
  buttons: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  button: {
    flex: 1,
    alignSelf: "center",
  },
  text: {
    color: theme["color-basic-1000"],
  },
}));
