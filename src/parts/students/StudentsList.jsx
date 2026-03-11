import { useSelector, useDispatch } from 'react-redux'
import { NewStudentForm } from './NewStudentForm';
import { Link } from 'react-router-dom';
import { TeacherForStudent } from './TeacherForStudent';
import { UserVotes } from './UserVotes';
import { selectAllStudents, fetchStudents } from './studentsSlice';
import { useEffect, useRef } from 'react';

const StudentCard = ({ student }) => {
    return (
        <div key={student.id} className='student-excerpt'>
            <h3>{student.name} {student.lastName}</h3>
            <TeacherForStudent teacherId={student.teacher} />
            <UserVotes student={student} />
            <Link to={`/students/${student.id}`} className='link-btn'>посмотреть</Link>
        </div>
    )
}

export const StudentsList = () => {
    const error = useSelector((state) => state.students.error);
    let content;
    const dispatch = useDispatch();
    const students = useSelector(selectAllStudents);
    const studentStatus = useSelector((state) => state.students.status);
    const dataFetch = useRef(false);
    useEffect(() => {
        if (dataFetch.current) return;
        dataFetch.current = true;
        if (studentStatus === 'idle') {
            dispatch(fetchStudents());
        }
    }, [studentStatus, dispatch]);

    //const dispStudents = students.map((student) => ());

    if (studentStatus === 'in progress') {
        content = <p>Загружается список студентов...</p>;
    } else if (studentStatus === 'success') {
        content = students.map((student) => (
            <StudentCard key={student.id} student={student} />
        ));
    } else if (studentStatus === 'fail') {
        content = <div>{error}</div>
    }

    return (
        <div>
            <NewStudentForm />
            <div>
                <h2>Студенты</h2>
                {content}
            </div>
        </div>
    )
}