const Joi = require('joi');
const express = require ('express');
const app =express();
app.use(express.json());
const students = [
{id :1, name: 'Ali'},
{id :2, name: 'Ahmed'},
{id :3, name: 'Haris'},
{id :4, name: 'Saqib'},
{id :5, name: 'Minahil'}
];
app.get('/', (req, res) =>
{
    res.send('Hello world!!!');
});
//Get all students
app.get('/una/students', (req, res) => 
{
    res.send(students);
});

//Get Students with ID
app.get('/una/students/:id', (req,res) =>
{
   const Student = students.find(s => s.id === parseInt(req.params.id));
   if  (!Student)   res.status(404).send("The student with given id not found");
       res.send(Student);
  
})
//Add student
app.post('/una/students', (req, res) =>
{
  
    const student = {
id: students.length +1,
name : req.body.name
    };
    students.push(student);
    res.send(student);
})
//Update Course
app.put('/una/students/:id', (req, res) =>
{
    //Check For the student
    //If doesnot exist return 404
    const Student = students.find(s => s.id === parseInt(req.params.id));
    if (!Student)
    {
        //404
        res.status(404).send("The student with given id not found");
    }
Student.name = req.body.name;
res.send(Student)
})
//Delete Student
app.delete('/una/students/:id', (req, res) => 
{
    const Student = students.find(s => s.id === parseInt(req.params.id));
    if (!Student)
    {
        //404
        res.status(404).send("The student with given id not found");
    }
    const index = students.indexOf(Student);
    students.splice(index, 1);
    res.send(Student);
})
//Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}....`));