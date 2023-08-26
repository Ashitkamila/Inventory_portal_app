import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginData: null,
  AllModulesGet:null
  
};
const listSlice = createSlice({
  name: "userData",
  initialState,

  reducers: {
 
    loginStartSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        loginData: action.payload,
      };
    },
    getAllModulesOfSidebar: (state, action) => {
    console.log('getAllModulesOfSidebar',action.payload);
      return {
        ...state,
        loading: false,
        AllModulesGet: action.payload,
      };
    },
    
    logout: (state) => {
      return {
        ...state,
        
          logInUser: null,
          loginData: null,
          loading: false,
          AllModulesGet:null,
      
      };
    },

  },
});

export const {
  loginStartSuccess,
  logout,
  loginError,
  getAllModulesOfSidebar,
  
} = listSlice.actions;

export default listSlice.reducer;
