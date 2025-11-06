import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// basic configaration

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

//cors
app.use(
    cors({
        origin:process.env.CORS?.split(',') || "http://localhost:5173",
        credentials:true,
        methods:['GET','POST','DELETE','PUT','PATCH'],
        allowedHeaders:['Content-Type',"Authorization"],
    })
)

app.get('/',(req,res)=>{
    res.send('API is working');
})

export default app;
