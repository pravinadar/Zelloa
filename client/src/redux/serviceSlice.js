import { createSlice } from '@reduxjs/toolkit'

export const serviceSlice = createSlice({
  name: 'service',

  initialState: {
    AddPostModal: false,
    EditProfileModal: false,
    MainMenu: false,
    DeletePost: false,
    DarkMode: false,
    myInfo: null,
    user: {},
    allPosts: [],
    postId: null,
    searchedUsers: []
  },

  reducers: {

    openAddPostModal: (state, action) => {
      state.AddPostModal = action.payload
    },
    openEditProfileModal: (state, action) => {
      state.EditProfileModal = action.payload
    },
    openMainMenu: (state, action) => {
      state.MainMenu = action.payload
    },
    toggleDeletePost: (state, action) => {
      state.DeletePost = action.payload
    },
    toggleDarkMode: (state) => {
      state.DarkMode = !state.DarkMode;
    },
    addUserInfo: (state, action) => {
      state.myInfo = action.payload.data.user;
    },
    addUser: (state, action) => {
      state.user = action.payload
    },
    addSinglePost: (state, action) => {
      let newArr = [...state.allPosts];
      let updatedArr = [action.payload.newPost, ...newArr];
      let uniqueArr = new Set();
      let uniquePosts = updatedArr.filter((e) => {
        if (!uniqueArr.has(e._id)) {
          uniqueArr.add(e);
          return true;
        }
        return false;
      });
      state.allPosts = [...uniquePosts];
    },
    addToAllPosts: (state, action) => {
      const newPostArray = [...action.payload.posts];
      if (state.allPosts.length === 0) {
        state.allPosts = newPostArray;
        return;
      }
      const existingPosts = [...state.allPosts];
      newPostArray.forEach(post => {
        const index = existingPosts.findIndex(i => i._id === post._id);
        if (index === -1) {
          existingPosts.push(post);
        } else {
          existingPosts[index] = post;
        }
      });
      state.allPosts = existingPosts;
    },
    deletePost: (state, action) => {
      let postArr = [...state.allPosts];
      let newArr = postArr.filter((e) => e._id !== state.postId);
      state.allPosts = newArr;
    },
    addPostId: (state, action) => {
      state.postId = action.payload;
    },
    addToSearchedUsers: (state, action) => {
      state.searchedUsers = action.payload; 
    }

  },
});

// Action creators are generated for each case reducer function
export const {
  openAddPostModal,
  openEditProfileModal,
  openMainMenu,
  toggleDeletePost,
  toggleDarkMode,
  addUserInfo,
  addToAllPosts,
  addSinglePost,
  addUser,
  deletePost,
  addPostId,
  addToSearchedUsers
} = serviceSlice.actions

export default serviceSlice.reducer;