const express = require('express');
const app = express();
const port = 3009;

const data = {
    student:[
        {id: 202450187, name: 'John Doe', year: 2, course: 'BSIT'},
        {id: 202450188, name: 'Jane Smith', year: 3, course: 'BSCS'},
        {id: 202450189, name: 'Bob Johnson', year: 1, course: 'BSIT'},
        {id: 202450190, name: 'Alice Brown', year: 2, course: 'BSCS'},
        {id: 202450191, name: 'Charlie Davis', year: 3, course: 'BSIT'}
    ]
};

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//to get all students
app.get('/students', (req, res) => {
  res.json(data.student);
});

//to get one student by id
app.get('/students/:id', (req, res) => {
    const id = Number(req.params.id);

    const student = data.student.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
});

//to add new student
app.post('/students', (req, res) => {
    const newStudent = req.body;

    data.student.push(newStudent);

    res.status(201).json({
        message: 'Student added',
        student: newStudent
    });
});

//update student by id
app.put('/students/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = data.student.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Student not found' });
    }

    data.student[index] = {
        ...data.student[index],
        ...req.body
    };

    res.json({
        message: 'Student updated',
        student: data.student[index]
    });
});

//to delete student by id
app.delete('/students/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = data.student.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Student not found' });
    }

    const deleted = data.student.splice(index, 1);

    res.json({
        message: 'Student deleted',
        student: deleted[0]
    });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});