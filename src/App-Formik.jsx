import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { useFormik } from "formik";
import { getAllPosts } from "./axios-post-crud";
import "./App.css";

const postSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "Minimum 3 characters")
    .required("Please enter a title"),
  imageUrl: yup
    .string()
    .url("Please check the image url")
    .required("Please enter a image"),
  caption: yup
    .string()
    .min(10, "Minimum 10 characters")
    .required("Please enter a caption"),
});

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

const AppFormik = () => {
  const formik = useFormik({
    initialValues: initialFormState,
    validationSchema: postSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      resetForm();
    },
  });

  const [posts, setPosts] = useState([]);

  const loadAllPosts = async () => {
    const allPosts = await getAllPosts();
    setPosts(allPosts);
  };

  useEffect(() => {
    loadAllPosts();
  }, []);

  const removePost = () => {};

  const loadPostForEdit = (postId) => {
    const data = posts.find((post) => post.id === postId);

    formik.setValues(data);
  };

  return (
    <div>
      {console.log(formik.errors)}
      {console.log(formik.touched)}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input
          id="title"
          name="title"
          className={
            formik.touched.title && formik.errors.title ? "error-inp" : ""
          }
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <br />
        {formik.touched.title && formik.errors.title && (
          <span className="error">{formik.errors.title}</span>
        )}
        <br />
        <br />
        <label htmlFor="imageUrl">Image: </label>
        <input
          id="imageUrl"
          type="url"
          name="imageUrl"
          className={
            formik.touched.imageUrl && formik.errors.imageUrl ? "error-inp" : ""
          }
          value={formik.values.imageUrl}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <br />
        {formik.touched.imageUrl && formik.errors.imageUrl && (
          <span className="error">{formik.errors.imageUrl}</span>
        )}
        <br />
        <br />
        <label htmlFor="caption">Caption: </label>
        <textarea
          id="caption"
          name="caption"
          className={
            formik.touched.caption && formik.errors.caption ? "error-inp" : ""
          }
          value={formik.values.caption}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        ></textarea>
        <br />
        {formik.touched.caption && formik.errors.caption && (
          <span className="error">{formik.errors.caption}</span>
        )}
        <br />
        <br />
        <input type="submit" />
      </form>
      <br />
      <br />
      <div className="posts-container">
        {posts.map((post) => {
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
    </div>
  );
};

export default AppFormik;
