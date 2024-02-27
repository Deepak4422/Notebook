const connectmongo=require('./connect');
const express=require('express');
const mongodb=require('mongodb');
const app=express();
var cors = require('cors')

app.use(cors())
app.use(cors({
    origin: ['https://deploy-mern-1whq.vercel.app'],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.listen(5600);