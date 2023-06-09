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
  addtocart: {
    display: "flex",
    alignitems: "center",
    border: "1px solid #ccc",
    padding: "10px",
    marginbottom: "10px",
  },
}));
