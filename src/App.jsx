import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./App.css";
// import { createPost, deletePost, editPost } from "./Post-Crud";
import {
  getAllPosts,
  createPost,
  deletePost,
  editPost,
} from "./axios-post-crud";
const Post = ({
  title,
  caption,
  imageUrl,
  id,
  removePost,
  loadPostForEdit,
}) => {
  return (
    <div className="post-card">
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <h4>{caption}</h4>
      <button onClick={() => removePost(id)}>Delete</button>
      <button onClick={() => loadPostForEdit(id)}>Edit</button>
    </div>
  );
};

Post.propTypes = {
  title: PropTypes.string,
  caption: PropTypes.string,
  imageUrl: PropTypes.string,
  id: PropTypes.string,
  removePost: PropTypes.func,
  loadPostForEdit: PropTypes.func,
};

const initialFormState = {
  title: "",
  imageUrl: "",
  caption: "",
};

function App() {
  const [formData, setFormData] = useState(initialFormState);

  // State variable to display the posts info
  const [postsData, setPosts] = useState([]);

  const [editingPost, setEditingPost] = useState(null);

  const handleDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loadAllPosts = async () => {
    const allPosts = await getAllPosts();
    setPosts(allPosts);
  };

  const removePost = async (postId) => {
    await deletePost(postId);

    setPosts(postsData.filter((post) => post.id !== postId));
  };

  const loadPostForEdit = (postId) => {
    setEditingPost(postId);

    const data = postsData.find((post) => post.id === postId);

    setFormData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingPost === null) {
      const postData = await createPost(formData);

      setPosts([...postsData, postData]);

      setFormData(initialFormState);
    } else {
      const postData = await editPost(formData, editingPost);

      const temp = [...postsData];

      const index = postsData.findIndex((post) => post.id === editingPost);

      temp[index] = postData;

      setPosts(temp);

      setFormData(initialFormState);
    }
  };

  useEffect(() => {
    loadAllPosts();
  }, []);

  return (
    <>
      <h3>{editingPost ? "Edit" : "Add"} Post</h3>
      {console.log(postsData)}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleDataChange}
        />
        <br />
        <br />
        <label htmlFor="imageUrl">Image: </label>
        <input
          id="imageUrl"
          type="url"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleDataChange}
        />
        <br />
        <br />
        <label htmlFor="caption">Caption: </label>
        <textarea
          id="caption"
          value={formData.caption}
          onChange={handleDataChange}
          name="caption"
        ></textarea>
        <br />
        <br />
        <input type="submit" />
      </form>
      <div className="posts-container">
        {postsData.map((post) => {
          return (
            <Post
              {...post}
              key={post.id}
              removePost={removePost}
              loadPostForEdit={loadPostForEdit}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
