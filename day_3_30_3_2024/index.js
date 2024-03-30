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
    const { stud_name } = req.body;
    students.push(stud_name);
    res.status(201).json(
        {
            "message": "Student added successfully"
        }
    );
}
);

app.delete("/:stud_name", (req, res) => {
    const { stud_name } = req.params;
    // students = students.filter(
    //     function handler(value) {
    //         return value !== stud_name;
    //     }
    // );
    // get the index of the student
    const index = students.indexOf(stud_name);
    // if the student exists
    if (index > -1) {
        // remove the student
        students.splice(index, 1);
        res.status(200).json(
            {
                "message": "Student deleted successfully"
            }
        );
    }
    else {
        res.status(404).json(
            {
                "message": "Student not found"
            }
        );
    }
}
);

app.listen(3000, function handler() {
    console.log('Server is listening on port 3000');
});