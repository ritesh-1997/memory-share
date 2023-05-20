import React,{useEffect} from "react";
import {Pagination, PaginationItem} from '@material-ui/lab'
import useStyles from './styles';
import {Link} from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import { getPosts } from "../../actions/posts";

const Paginate = ({page}) => {
    console.log("In Pagination");
    const {numberOfPages} = useSelector((state)=>state.posts);
    const dispatch = useDispatch();
    useEffect(()=>{
      if(page) dispatch(getPosts(page));
    },[page]);
    const classes = useStyles();
    return (
        <Pagination 
         classes={{ul:classes.ul}}
         color="secondary"
         count={numberOfPages}
         page={Number(page)||1}
         variant="text"
         shape="rounded"
         renderItem={(item) => (
            <PaginationItem
              {...item}
              component={Link}
              to={`/posts?page=${item.page}`}
            />
          )}
         />
    );
};
export default Paginate;