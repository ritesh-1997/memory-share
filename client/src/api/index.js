/**
 * This route will tell the address where api has to hit it.
 * Server has to run to reciprocate the request from the client.
 * Once server get the request it will perform actions as given.
 * 
 * Here we will write the api method declaration
 */
// Implementing redux
import axios from 'axios';

const url = 'http://localhost:5001/posts';

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id,updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
