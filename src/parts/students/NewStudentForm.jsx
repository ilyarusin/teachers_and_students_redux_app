import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addStudent } from './studentsSlice'

/*

if (name && lastName && age && specialty) {
                dispatch(studentAdded(name, lastName, age, specialty, teacherId));

                setName('');
                setAge(0);
                setLastName('');
                setSpecialty('');
            }

*/

export const NewStudentForm = () => {
    const [requestStatus, setRequestStatus] = useState('idle');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState(0);
    const [specialty, setSpecialty] = useState('');
    const [teacherId, setTeacherId] = useState('');

    const dispatch = useDispatch();
    const teachers = useSelector((state) => state.teachers);

    const onNameChanged = (e) => setName(e.target.value);
    const onLastNameChanged = (e) => setLastName(e.target.value);
    const onAgeChanged = (e) => setAge(e.target.value);
    const onSpecialtyChanged = (e) => setSpecialty(e.target.value);
    const onTeacherChanged = (e) => setTeacherId(e.target.value);

    const canBeSaved =
        [name, lastName, age, specialty, teacherId].every(Boolean) && requestStatus === 'idle';

    const onSaveStudentClick = async () => {
        if (canBeSaved) {
            try {
                setRequestStatus('in progress');
                await dispatch(addStudent({ name, lastName, age, specialty, teacher: teacherId })).unwrap();
                setName('');
                setAge(0);
                setLastName('');
                setSpecialty('');
                setTeacherId('');
            } catch (error) {
                console.error('save student error: ', error);
            } finally {
                setRequestStatus('idle');
            }
        }
    }

    const teachersList = teachers.map((teacher) => (
        <option value={teacher.id} key={teacher.id}>
            {teacher.name}
        </option>
    ));

    return (
        <div>
            <h2>Добавить нового студента</h2>
            <form>
                <p>
                    <label htmlFor="studentName">Имя:</label>
                    <input type="text" id='studentName' name='studentName' value={name} onChange={onNameChanged} />
                </p>
                <p>
                    <label htmlFor="studentLastName">Фамилия:</label>
                    <input type="text" id='studentLastName' name='studentLastName' value={lastName} onChange={onLastNameChanged} />
                </p>
                <p>
                    <label htmlFor="teacher">Преподаватель:</label>
                    <select id="teacher" value={teacherId} onChange={onTeacherChanged}>
                        <option value=""></option>
                        {teachersList}
                    </select>
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