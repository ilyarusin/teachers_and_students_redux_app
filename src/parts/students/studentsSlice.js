import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client';

const initialState = {
    students: [],
    status: 'idle',
    error: null
};

export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
    const response = await client.get('/fakeServer/students');
    return response.data;
});

export const addStudent = createAsyncThunk(
    'students/addStudent',
    async (newStudent) => {
        const response = await client.post('/fakeServer/students', newStudent);
        return response.data;
    }
);

/*

studentAdded: {
                reducer(state, action) {
                    state.students.push(action.payload);
                },
                prepare(name, lastName, age, specialty, teacherId) {
                    return {
                        payload: {
                            id: nanoid(),
                            name,
                            lastName,
                            age,
                            specialty,
                            teacher: teacherId,
                            votes: {
                                leader: 0,
                                captain: 0
                            }
                        }
                    }
                }
            },

*/

const studentsSlice = createSlice(
    {
        name: 'students',
        initialState,
        reducers: {
            studentUpdated(state, action) {
                const { id, name, lastName, age, specialty } = action.payload;
                const desStudent = state.students.find(student => student.id === id);
                if (desStudent) {
                    desStudent.name = name;
                    desStudent.lastName = lastName;
                    desStudent.age = age;
                    desStudent.specialty = specialty;
                }
            },
            voteClicked(state, action) {
                const { studentId, vote } = action.payload;
                const currentStudent = state.students.find(student => student.id === studentId);
                if (currentStudent) {
                    currentStudent.votes[vote]++;
                }
            }
        },
        extraReducers(builder) {
            builder.addCase(fetchStudents.pending, (state) => {
                state.status = 'in progress';
            })
                .addCase(fetchStudents.fulfilled, (state, action) => {
                    state.status = 'success';
                    state.students = state.students.concat(action.payload);
                })
                .addCase(fetchStudents.rejected, (state, action) => {
                    state.status = 'fail';
                    state.error = action.error.message;
                })
                .addCase(addStudent.fulfilled, (state, action) => {
                    state.students.push(action.payload);
                })
        }
    }
);

export const { studentUpdated, voteClicked } = studentsSlice.actions;
export default studentsSlice.reducer;
export const selectAllStudents = (state) => state.students.students;
export const selectStudentById = (state, studentId) => state.students.students.find((student) => student.id === studentId);