import React,{useState,useRef} from "react";
import {Typography,TextField,Button} from "@material-ui/core";
import {useDispatch} from 'react-redux';
import {commentPost} from '../../actions/posts';

import useStyle from './styles.js';

const CommentSection = ({post}) =>{
    const classes = useStyle();
    const dispatch = useDispatch();
    const [comments,setComments] = useState(post?.comments);
    const [comment,setComment] = useState('');
    const commentsRef = useRef();
    const user = JSON.parse(localStorage.getItem('profile'));

    if(Number(comments.length)>0){

        console.log('Comments present');
    }

    const handleClick = async () =>{
        /**
         * We can add id to the comment, which we can use to display/edit the comment
         */
        const finalComment = `${user.result._id}: ${comment}:${user.result.name}`
        const newComments = await dispatch(commentPost(finalComment,post._id));
        setComments(newComments);
        setComment('');
        //commentsRef.current.scrollIntoView({behavior: 'smooth'});
    };

    return(
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments.map((c,i)=>(
                        <Typography key={i} gutterBottom variant="subtitle1">
                            <strong>{(c.split(':')[2]|| c.split(': ')[0])}</strong>
                            {c.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef}/>
                </div>
                {user?.result?.name &&(           
                <div style={{width:'70%'}}>
                    <Typography gutterBottom variant="h6">Write a Comment</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Comment"
                        multiline
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button
                    style={{marginTop:'10px'}}
                    variant="contained"
                    color="primary"
                    disabled={!comment}
                    onClick={handleClick}>
                    Comment
                    </Button>
                </div>
                )}
            </div>
        </div>
    )
}

export default CommentSection;