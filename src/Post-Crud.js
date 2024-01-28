// This file contians all the methods for doing CRUD operations

const backendUrl = "https://657ec91c3e3f5b1894642141.mockapi.io";

const handleError = (err) => {
  console.log(err);
  alert("Something went wrong");
};

// Read all the Posts
const getAllPosts = async () => {
  try {
    const response = await fetch(`${backendUrl}/posts`);
    const posts = await response.json();
    return posts;
  } catch (e) {
    handleError(e);
  }
};

const createPost = async (postData) => {
  try {
    const response = await fetch(`${backendUrl}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(postData),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    handleError(e);
  }
};

const editPost = async (postData, postId) => {
  try {
    const response = await fetch(`${backendUrl}/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(postData),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    handleError(e);
  }
};

const deletePost = async (postId) => {
  try {
    await fetch(`${backendUrl}/posts/${postId}`, {
      method: "DELETE",
    });
    return { msg: "successfully deleted" };
  } catch (e) {
    handleError(e);
  }
};

export { getAllPosts, createPost, deletePost, editPost };
