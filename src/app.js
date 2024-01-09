const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require('./routes/users');
const loggerOne= require('./middlewares/logerOna')
const loggerTwo=require('./middlewares/logerTwo')

dotenv.config()

const {
  PORT = 3005, 
  API_URL =  "http://127.0.0.1",
  MONGO_URL ="mongodb://127.0.0.1:27017/test"
} = process.env


mongoose.connect(MONGO_URL, err => {
  if (err) throw err;
  console.log('connected')
})


const  app = express();



const helloWorld = (request, response) =>{
  response.status(200);
  response.send('hello');
}

app.use(cors())
app.use(bodyParser.json())
app.use(loggerOne)
app.use(loggerTwo)
app.get('/', helloWorld)

//Обработка запросов
app.post ('/', (request, response)=>{
  response.status(200);
  response.send('Создание нового пользователя');
})


app.use(userRouter);

app.listen(PORT, () =>{
  console.log ('Сервер запущен по адресу http://127.0.0.1:3005');
})

