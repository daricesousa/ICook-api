import 'reflect-metadata';
import './database';
import express from 'express';
import { router } from './routes';
import * as dotenv from 'dotenv';
import { initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
import cors from 'cors'

const serviceAccount = JSON.parse(process.env.FIREBASE);

initializeApp({credential: admin.credential.cert(serviceAccount)});

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({limit: '5mb'}));
app.use(router);

const port = process.env.PORT|| 3000;
app.listen(port, () => console.info(`server is running - port:${port}`));