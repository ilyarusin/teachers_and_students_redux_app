import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client';

/*
    {id: '0', name: 'Петрова Н.В.', subject: 'физика'},
    {id: '1', name: 'Велькова Л.А.', subject: 'математика'},
    {id: '3', name: 'Кручинина Д.М.', subject: 'биология'}
*/

const initialState = [];

export const fetchTeachers = createAsyncThunk(
    'teachers/fetchTeachers',
    async () => {
        const response = await client.get('/fakeServer/teachers');
        return response.data;
    }
)

const teachersSlice = createSlice({
    name: 'teachers',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchTeachers.fulfilled, (state, action) => {
            return action.payload;
        });
    }
});

export default teachersSlice.reducer;
export const selectAllTeachers = (state) => state.teachers;
export const selectTeacherById = (state, teacherId) => state.teachers.find((teacher) => teacher.id === teacherId);