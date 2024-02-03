import axios from "axios";

const instance = axios.create({
  baseURL: "https://657ec91c3e3f5b1894642141.mockapi.io",
  timeout: 10000,
  headers: { batch: "B52WETAMIL" },
});

const handleError = (err) => {
  console.log(err);
  alert("Something went wrong");
};

// Read all the Posts
const getAllPosts = async () => {
  try {
    const response = await instance.get("/posts");
    console.log(response);
    return response.data;
  } catch (e) {
    handleError(e);
  }
};

const createPost = async (postData) => {
  try {
    const response = await instance.post("/posts", postData);
    return response.data;
  } catch (e) {
    handleError(e);
  }
};

const editPost = async (postData, postId) => {
  try {
    const response = await instance.put(`/posts/${postId}`, postData);
    return response.data;
  } catch (e) {
    handleError(e);
  }
};

const deletePost = async (postId) => {
  try {
    await instance.delete(`/posts/${postId}`);
    return { msg: "successfully deleted" };
  } catch (e) {
    handleError(e);
  }
};

export { getAllPosts, createPost, editPost, deletePost };
