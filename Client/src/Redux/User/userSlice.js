import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  clicked: false,
  User: null,
  avator:null
}

export const counterSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    isClick: (state) => {
     state.clicked= !state.clicked
    },
    UserExist:(state,action)=>{
    state.User = action.payload.User;
    state.avator = action.payload.avator;
    }
  
  },
})

// Action creators are generated for each case reducer function
export const { isClick,UserExist } = counterSlice.actions

export default counterSlice.reducer