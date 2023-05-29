import React,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box } from "@mui/system";
import {
  Button,
  Grid,
  IconButton,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import { Link as RouteLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Paper, CircularProgress, Divider } from '@material-ui/core/';
import backgroundImage from "../../images/background.jpg";
import { useParams, useNavigate } from 'react-router-dom';
import {getUserProfile} from '../../actions/profile';
import { useSearchParams } from 'react-router-dom';
import useStyles from './styles';
import Post from "../Posts/Post/Post";


const Profile = () => {

  console.log("Hi In Profile");
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const classes = useStyles();
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = searchParams.get('id');
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    dispatch(getUserProfile(userId));
  }, [userId]);

  // useEffect(() => {
  //   if (profile.userId) {
  //     dispatch(getFollowers(profile.userId._id));
  //     dispatch(getFollowings(profile.userId._id));
  //   }
  // }, [dispatch, profile.userId]);

  if (!posts) return null;
  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }
  console.log('Loading');
  // const userId = searchParams.get('id');

  // setUserId(searchParams.get('id'));
  console.log("--------------------------------");

  console.log(posts);
  return (
    <Box>
      <Box elevation={6} borderBottom="1px solid #ccc" padding="8px 20px">
      <Grid container alignItems="center">
      <Grid item sx={{ mr: "10px" }}>
            <RouteLink to="/">
              <IconButton>
                <ArrowBackIcon />
              </IconButton>
            </RouteLink>
      </Grid>
      <Grid item>
        <Typography variant="h6">
          {user?.result?.name}
        </Typography>
        <Typography sx={{ fontSize: "12px", color: "#555" }}>
          {posts?.data?.length} posts
        </Typography>{" "}
          </Grid>
      </Grid>
      </Box>
      <Box height="90vh" sx={{ overflowY: "scroll" }}>
        <Box position="relative">
          <img
            width="100%"
            // src={}
            alt="background"
          />
          <Box
            sx={{
              position: "absolute",
              top: 120,
              left: 15,
              background: "#eee",
              borderRadius: "50%",
            }}
          >
            <img width="150px" src={user?.result?.picture} alt="profile" />
          </Box>
        </Box>

        <Box textAlign="right" padding="10px 20px">
        <IconButton>
          <MoreHorizIcon />
        </IconButton>
        <IconButton>
          <MailOutlineIcon />
        </IconButton>
        <Button
          // onClick={handleFollow}
          size="small"
          sx={{
            borderRadius: theme.shape.borderRadius,
            textTransform: "capitalize",
            padding: "6px 20px",
            background: "black",
            "&:hover": {
              background: "#333",
            },
          }}
          variant="contained"
        >
          Follow
        </Button>
        <Button
          // onClick={handleUnfollow}
          size="small"
          sx={{
            borderRadius: theme.shape.borderRadius,
            textTransform: "capitalize",
            padding: "6px 20px",
            background: "black",
            "&:hover": {
              background: "#333",
            },
          }}
          variant="contained"
          color='primary'
        >
          Unfollow
        </Button>
        </Box>

        <Box padding="10px 20px">
          <Typography variant="h6" sx={{ fontWeight: "500" }}>
            {user?.result?.name}
          </Typography>
          <Typography sx={{ fontSize: "14px", color: "#555" }}>
            @{userId}
          </Typography>
          <Typography fontSize="16px" color="#333" padding="10px 0">
            Hey, there's something.
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            padding="6px 0"
            flexWrap="wrap"
          >
            <Box display="flex">
              <LocationOnIcon htmlColor="#555" />
              <Typography sx={{ ml: "6px", color: "#555" }}>
                {/* {profile.location} */}
                India
              </Typography>
            </Box>
            <Box display="flex" marginLeft="1rem">
              <InsertLinkIcon htmlColor="#555" />
              <Link
                sx={{ textDecoration: "none", marginLeft: "6px" }}
                href={"https:/wasifbaliyan.com"}
              >
                {"www"}
              </Link>
            </Box>

          </Box>
        </Box>

        {
          isLoading ? (
            <CircularProgress />
          ) : (
            <Grid
              className={classes.container}
              container
              alignItems="stretch"
              spacing={3}
            >
              {posts.data.map((post) => (
                <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                  <Post post={post} setCurrentId={null} />
                </Grid>
              ))}
            </Grid>)
        }
      </Box>
      </Box>
    
  )
}

export default Profile;
