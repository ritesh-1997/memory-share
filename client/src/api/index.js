/**
 * This route will tell the address where api has to hit it.
 * Server has to run to reciprocate the request from the client.
 * Once server get the request it will perform actions as given.
 *
 * Here we will write the api method declaration
 */
// Implementing redux
import axios from "axios";

const localserverURL = "http://localhost:5001";
const serverURL = "https://memory-share-xip0.zeet-team-ritesh-1997.zeet.app";
const API = axios.create({ baseURL: serverURL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );

export const createPost = (newPost) => API.post("/posts", newPost);

export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post("/user/signin", formData);

export const signUp = (formData) => API.post("/user/signup", formData);

export const googleSignIn = (authCode) =>
  API.post("/user/auth/google", authCode);
