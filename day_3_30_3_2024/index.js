import express from 'express';

const app = express();

app.use(express.json())


let students = ["laiba", "zayan", "kashif", "asaad", "usama", "qasim"];

app.get("/", (req, res) => {
    res.status(200).json(
        {
            "students": students
        }
    );
}
);

app.post("/", (req, res) => {
    const {stud_name} = req.body;
    students.push(stud_name);
    res.status(200).json(
        {
            "message": "Student added successfully"
        }
    );
}
);

app.listen(3000, function handler() {
    console.log('Server is listening on port 3000');
});