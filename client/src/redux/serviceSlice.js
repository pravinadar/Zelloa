import { createSlice } from '@reduxjs/toolkit'

export const serviceSlice = createSlice({
  name: 'service',

  initialState: {
    AddPostModal: false,
    EditProfileModal: false,
    MainMenu: false
  },
  
  reducers: {

    openAddPostModal: (state, action) => {
      state.AddPostModal = action.payload
    },
    openEditProfileModal: (state,action)=>{
      state.EditProfileModal = action.payload
    },
    openMainMenu: (state, action) => {
      state.MainMenu = action.payload
    }

  },
});

// Action creators are generated for each case reducer function
export const { 
  openAddPostModal,
  openEditProfileModal,
  openMainMenu
} = serviceSlice.actions

export default serviceSlice.reducer;