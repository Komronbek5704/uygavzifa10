import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost } from './postsSlice';
import UpdatePostForm from './UpdatePostForm';
import Spinner from '../components/Spinner'; 

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  const handleEdit = (id) => {
    setEditing(id);
  };

  let name;
  if (postStatus === 'loading') {
    name = <Spinner />;
  } else if (postStatus === 'succeeded') {
    name = posts.map((post) => (
      <article key={post.id}>
        <h2>{post.type}</h2>
        <p>{post.name}</p>
        <button onClick={() => handleEdit(post.id)}>Edit</button>
        <button onClick={() => handleDelete(post.id)}>Delete</button>
        {editing === post.id && (
          <UpdatePostForm postId={post.id} setEditing={setEditing} />
        )}
      </article>
    ));
  } else if (postStatus === 'failed') {
    name = <p>{error}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {name}
    </section>
  );
};

export default PostsList;