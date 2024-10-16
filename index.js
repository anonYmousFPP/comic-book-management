import express from 'express'
import comic_book from './api/comic_book.js';

import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());


app.use('/book', comic_book);

app.listen(process.env.PORT);