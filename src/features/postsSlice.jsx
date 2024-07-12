import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://server-k3to.onrender.com'; // Render.com API URL

// Fetch posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(`${BASE_URL}/posts`);
  return response.data;
});

// Add post
export const addPost = createAsyncThunk('posts/addPost', async (newPost) => {
  const response = await axios.post(`${BASE_URL}/posts`, newPost);
  return response.data;
});

// Update post
export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, updatedPost }) => {
  const response = await axios.put(`${BASE_URL}/posts/${id}`, updatedPost);
  return response.data;
});

// Delete post
export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  await axios.delete(`${BASE_URL}/posts/${id}`);
  return id;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((post) => post.id === action.payload.id);
        state.posts[index] = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;