import express from 'express';

const app = express();

app.get('/', function handler(req, res) {
    res.status(200).json(
        {
            message: 'Hello World'
        }
    )
});

app.listen(3000, function handler() {
    console.log('Server is listening on port 3000');
});