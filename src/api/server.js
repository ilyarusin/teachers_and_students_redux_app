import { setupWorker } from 'msw/browser'
import { factory, oneOf, manyOf, primaryKey } from '@mswjs/data'
import { nanoid } from '@reduxjs/toolkit';
import { http, HttpResponse, delay } from 'msw'
import { fakerRU as faker } from '@faker-js/faker';

const NUM_TEACHERS = 3;
const STUDENTS_PER_TEACHER = 3;
const ARTIFICIAL_DELAY_MS = 2000;

const teacherNames = ['Петрова Н.В.', 'Велькова Л.А.', 'Кручинина Д.М.'];
const subjects = ['физика', 'математика', 'биология'];
const studentNames = ['Илья', 'Матвей', 'Агапко', 'Дарья', 'Джон', 'Андрей', 'Савелий', 'Дмитрий', 'Михаил'];
const studentLastNames = ['Пиминов', 'Марков', 'Меркушкин', 'Леонов', 'Гайдамак', 'Деревлёв', 'Крамаров', 'Ватутин', 'Шеляпин'];
const studentSpecialties = ['программист', 'веб-дизайнер', 'историк', 'тестировщик ПО', 'инженер-робототехник', 'сетевой инженер',
    'специалист по кибербезопасности', 'разработчик игр', 'системный администратор'];

export const db = factory({
    student: {
        id: primaryKey(nanoid),
        name: String,
        lastName: String,
        age: Number,
        specialty: String,
        teacher: oneOf('teacher'),
        votes: oneOf('vote')
    },
    teacher: {
        id: primaryKey(nanoid),
        name: String,
        subject: String,
        students: manyOf('student')
    },
    vote: {
        id: primaryKey(nanoid),
        leader: String,
        captain: String,
        student: oneOf('student')
    }
});

const createTeacherData = (nameNum) => {
    const name = teacherNames[nameNum];
    const subject = subjects[getRandInt(0, subjects.length - 1)];

    return {
        name: `${name}`,
        subject: `${subject}`
    }
};

function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const createStudentData = (teacher) => {
    const name = faker.person.firstName();;
    const lastName = faker.person.lastName();
    const specialty = studentSpecialties[getRandInt(0, studentSpecialties.length - 1)];

    return {
        name: `${name}`,
        lastName: `${lastName}`,
        specialty: `${specialty}`,
        age: getRandInt(18, 40),
        votes: db.vote.create(),
        teacher
    }
}

for (let i = 0; i < NUM_TEACHERS; i++) {
    const newTeacher = db.teacher.create(createTeacherData(i));

    for (let j = 0; j < STUDENTS_PER_TEACHER; j++) {
        const newStudent = createStudentData(newTeacher);
        db.student.create(newStudent);
    }
}

const serializeStudent = (student) => (
    {
        ...student,
        teacher: student.teacher.id
    }
)

export const handlers = [
    http.get('/fakeServer/students', async () => {
        const students = db.student.getAll().map(serializeStudent);
        await delay(ARTIFICIAL_DELAY_MS);
        return HttpResponse.json(students);
    }),
    http.get('/fakeServer/teachers', async () => {
        await delay(ARTIFICIAL_DELAY_MS);
        return HttpResponse.json(db.teacher.getAll());
    }),
    http.post('/fakeServer/students', async ({ request }) => {
        const data = await request.json();
        if (data.content === 'error') {
            await delay(ARTIFICIAL_DELAY_MS);

            return new HttpResponse('ошибка сохранения на сервере', {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }

        const teacher = db.teacher.findFirst({
            where: { id: { equals: data.teacher } }
        });
        data.teacher = teacher;
        data.votes = db.vote.create();
        const student = db.student.create(data);
        await delay(ARTIFICIAL_DELAY_MS);
        return HttpResponse.json(serializeStudent(student));
    })
];

export const worker = setupWorker(...handlers);
worker.listHandlers().forEach((handler) => {
	console.log(handler.info.header)
});