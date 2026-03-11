import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllTeachers } from './teachersSlice';

export const TeachersList = () => {
    const teachers = useSelector(selectAllTeachers);
    const teachersToRender = teachers.map((teacher) => (
        <li key={teacher.id}>
            <Link to={`/teachers/${teacher.id}`}>{teacher.name} ({teacher.subject})</Link>
        </li>
    ));

    return (
        <div>
            <h2>Преподаватели:</h2>
            <ul>{teachersToRender}</ul>
        </div>
    )
}