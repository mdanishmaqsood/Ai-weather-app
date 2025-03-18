import { createSlice } from '@reduxjs/toolkit';

import { IInitialState } from './types';
import { User } from '@/types';

const getInitialValues = () => {
  let user = {} as User;
  let token = '' as string;
  let isAuthenticated = false;

  return {
    token,
    isAuthenticated,
    user,
  };
};
const initialState: IInitialState = {
  user: getInitialValues().user,
  isAuthenticated: getInitialValues().isAuthenticated,
};

const authSlice = createSlice({
  name: 'userCredentials',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      if (action.payload.user)
        localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    userLoggedOut: (state) => {
      state.user = undefined;
      state.isAuthenticated = false;
      const theme = localStorage.getItem('theme');
      localStorage.clear();

      if (theme) localStorage.setItem('theme', theme);
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
