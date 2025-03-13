import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import appwriteService from '../appwrite/configure';

// Thunk to fetch user profile and their posts
export const fetchUserProfile = createAsyncThunk(
  'userProfile/fetchUserProfile',
  async (userId) => {
    const userProfile = await appwriteService.getUserProfile(userId); // Fetch user profile
    const userPosts = await appwriteService.getUserPosts(userId); // Fetch posts by user
    return { userProfile, userPosts: userPosts || [] }; // Make sure userPosts is always an array
  }
);

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    userProfile: null,
    userPosts: [], // Ensure this is initialized as an empty array
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userProfile = action.payload.userProfile;
        state.userPosts = action.payload.userPosts;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userProfileSlice.reducer;
