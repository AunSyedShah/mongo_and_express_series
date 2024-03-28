import express from 'express';

const app = express(); // initialize express app


// create a route for the app

app.get('/', (req, res) => {
    res.send('<h1>Welcome to Home</h1>');
});

app.get('/student/:std_id', (req, res) => {
    const { std_id } = req.params;
    res.send(`<h1>Hello ${std_id}</h1>`);
});

app.get('/add/:num1/:num2', (req, res) => {
    const { num1, num2 } = req.params;
    const sum = parseInt(num1) + parseInt(num2);
    res.send(`<h1>The sum is ${sum}</h1>`);
}
);

// listen to the server
app.listen(3000);