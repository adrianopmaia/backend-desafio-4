import mongoose from 'mongoose';
import express from 'express';
import { gradeRouter } from './routes/gradeRouter.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import { db } from './models/index.js';
import dotenv from 'dotenv';
dotenv.config();


(async () => {
  try {
    console.log('Conectando a MongoDB Atlas de novo');
    await mongoose.connect(
      `mongodb+srv://${process.env.USER_DB}:${process.env.USER_PASS}@cluster0.m9ih6.mongodb.net/bootcamp?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('MongoDB Atlas Conectado');
  } catch (error) {
    'Erro ao conectar ao MongoDb Atlas ' + error;
  }
})();

const app = express();

//define o dominio de origem para consumo do servico
app.use(express.json());
app.use(gradeRouter);/*
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:8080',
  })
);

app.get('/', (req, res) => {
  res.send('API em execucao');
});*/

app.listen(process.env.PORT || 8081, () => {console.log('Api rodando man')});
