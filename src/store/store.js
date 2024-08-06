import { configureStore } from '@reduxjs/toolkit';

import studentReducer from '../redux/students/studentSlice'
import tutorReducer from '../redux/tutors/tutorSlice'
const store = configureStore({
  reducer: {
    student: studentReducer,
    tutor: tutorReducer
  },
});

export default store;
