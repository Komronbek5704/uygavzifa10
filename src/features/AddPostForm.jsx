import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from './postsSlice';

const AddPostForm = () => {
  const [type, settype] = useState('');
  const [name, setname] = useState('');
  const dispatch = useDispatch();

  const ontypeChanged = (e) => settype(e.target.value);
  const onnameChanged = (e) => setname(e.target.value);

  const onSavePostClicked = () => {
    if (type && name) {
      dispatch(addPost({ type, name }));
      settype('');
      setname('');
    }
  };

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="posttype">Post type:</label>
        <input
          type="text"
          id="posttype"
          name="posttype"
          value={type}
          onChange={ontypeChanged}
        />
        <label htmlFor="postname">name:</label>
        <textarea
          id="postname"
          name="postname"
          value={name}
          onChange={onnameChanged}
        />
        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;