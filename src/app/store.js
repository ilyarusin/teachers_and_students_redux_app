import { configureStore } from '@reduxjs/toolkit'
import studentsReducer from '../parts/students/studentsSlice'
import teachersReducer from '../parts/teachers/teachersSlice'

export default configureStore({
	reducer: {
        students: studentsReducer,
        teachers: teachersReducer
    }
});