import { configureStore } from '@reduxjs/toolkit';

import studentReducer from '../redux/students/studentSlice'

import tutorReducer from '../redux/tutors/tutorSlice'

import adminReducer from '../redux/admin/adminSlice'

const store = configureStore({
  reducer: {
    student: studentReducer,
    tutor: tutorReducer,
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;