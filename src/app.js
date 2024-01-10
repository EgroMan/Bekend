const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const bookRouter = require('./routes/books');
const logger = require('./middlewares/logger')

dotenv.config();
const {
    PORT  = 3005 ,
    API_URL = "http://127.0.0.1",
    MONGO_URL = "mongodb://127.0.0.1:27017/test"
} = process.env;

mongoose.connect(MONGO_URL).then (() => 
console.log("Connected to Mongo!")).catch((error) => console.log("[MONGO_CONNECTION]", error));

const app = express();


const helloWorld = (request, response) => {
    response.status(200);
    response.send("Hello, World!");
}
app.use(cors());
app.use(logger);
app.use(bodyParser.json());

app.get('/', helloWorld);

app.post('/', (request, response) => {
    response.status(200);
    response.send("Hello from POST");
});



app.use(userRouter);
app.use(bookRouter);
app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу ${API_URL}:${PORT}`);
});