import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { studentUpdated } from './studentsSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { selectStudentById } from './studentsSlice'

export const EditStudentForm = () => {
    let params = useParams();
    const { studentId } = params;

    const student = useSelector((state) => selectStudentById(state, studentId));

    const [name, setName] = useState(student.name);
    const [lastName, setLastName] = useState(student.lastName);
    const [age, setAge] = useState(student.age);
    const [specialty, setSpecialty] = useState(student.specialty);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onNameChanged = (e) => setName(e.target.value);
    const onLastNameChanged = (e) => setLastName(e.target.value);
    const onAgeChanged = (e) => setAge(e.target.value);
    const onSpecialtyChanged = (e) => setSpecialty(e.target.value);

    const onSaveStudentClick = () => {
        if (name && lastName && age && specialty) {
            dispatch(
                studentUpdated({
                    id: studentId,
                    name,
                    lastName,
                    age,
                    specialty
                })
            );

            navigate(`/students/${studentId}`);
        }
    }

    return (
        <div>
            <h2>Редактирование страницы студента</h2>
            <form action="">
                <p>
                    <label htmlFor="studentName">Имя:</label>
                    <input type="text" id='studentName' name='studentName' value={name} onChange={onNameChanged} />
                </p>
                <p>
                    <label htmlFor="studentLastName">Фамилия:</label>
                    <input type="text" id='studentLastName' name='studentLastName' value={lastName} onChange={onLastNameChanged} />
                </p>
                <p>
                    <label htmlFor="studentAge">Возраст:</label>
                    <input type="number" id='studentAge' name='studentAge' value={age} onChange={onAgeChanged} />
                </p>
                <p>
                    <label htmlFor="studentSpecialty">Специальность:</label>
                    <input type="text" id='studentSpecialty' name='studentSpecialty' value={specialty} onChange={onSpecialtyChanged} />
                </p>
                <button type="button" onClick={onSaveStudentClick}>Сохранить</button>
            </form>
        </div>
    );
}