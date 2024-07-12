import React from 'react';
import PostsList from './features/PostsList';
import AddPostForm from './features/AddPostForm';
import './index.css';

function App() {
  return (
    <div className="App">
      <AddPostForm />
      <PostsList />
    </div>
  );
}

export default App;