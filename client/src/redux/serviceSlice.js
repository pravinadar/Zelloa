import { createSlice } from '@reduxjs/toolkit'

export const serviceSlice = createSlice({
  name: 'service',

  initialState: {
    AddPostModal: false
  },
  
  reducers: {

    openAddPostModal: (state, action) => {
      state.AddPostModal = action.payload
    },

  },
});

// Action creators are generated for each case reducer function
export const { openAddPostModal } = serviceSlice.actions

export default serviceSlice.reducer;