import { useSelector } from "react-redux";

export const TeacherForStudent = ({teacherId}) => {
    const teacher = useSelector((state) => state.teachers.find((teacher) => teacher.id === teacherId));
    return <span>{teacher ? teacher.name + ` (${teacher.subject})` : 'аноним'}</span>;
}