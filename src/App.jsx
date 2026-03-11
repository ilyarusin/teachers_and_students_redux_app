import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './app/root'
import { StudentsList } from './parts/students/StudentsList';
import { StudentPage } from './parts/students/StudentPage';
import { EditStudentForm } from './parts/students/EditStudentForm';
import { TeachersList } from './parts/teachers/TeachersList';
import { TeacherPage } from './parts/teachers/TeacherPage';

const router = createBrowserRouter([{ path: '/', element: <Root />, children: [
	{
		path: '/students',
		element: <StudentsList />
	},
	{
		path: '/students/:studentId',
		element: <StudentPage />
	},
	{
		path: '/editStudent/:studentId',
		element: <EditStudentForm />
	},
	{
		path: '/teachers',
		element: <TeachersList />
	},
	{
		path: '/teachers/:teacherId',
		element: <TeacherPage />
	}
] }], {
	basename: '/teachers_and_students_redux_app'
});

function App() {
	return <RouterProvider router={router} />
}

export default App