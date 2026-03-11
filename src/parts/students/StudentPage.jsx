import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { TeacherForStudent } from './TeacherForStudent';
import { UserVotes } from './UserVotes';
import { selectStudentById } from './studentsSlice';

export const StudentPage = () => {
    let params = useParams();
    const { studentId } = params;
    const student = useSelector((state) => selectStudentById(state, studentId));

    if (!student) {
        return <p>No such student</p>;
    }

    return (
        <div>
            <h3>{student.name} {student.lastName}</h3>
            <p>id: {student.id}</p>
            <TeacherForStudent teacherId={student.teacher} />
            <p>Возраст: {student.age}</p>
            <p>Специальность: {student.specialty}</p>
            <UserVotes student={student} />
            <Link to={`/editStudent/${student.id}`} className='link-btn'>редактировать</Link>
        </div>
    )
}