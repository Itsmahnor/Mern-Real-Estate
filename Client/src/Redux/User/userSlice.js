import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  clicked: false,
}

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    isClick: (state) => {
     state.clicked= !clicked
    },
  
  },
})

// Action creators are generated for each case reducer function
export const { isClick } = counterSlice.actions

export default counterSlice.reducer