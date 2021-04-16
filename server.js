import express from 'express';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use('/posts', postRoutes);

app.get('/', (req, res)=>{
    res.send('Hello to Memories Apllication')
});

const port = process.env.PORT || 8000;

mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,})
   .then( ()=> console.log("database is connected"))
   .catch( error => console.log(error)) 

app.listen(port, ()=> console.log(`listen on port ${port}`))