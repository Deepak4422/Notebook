const connectmongo=require('./connect');
const express=require('express');
const mongoose=require('mongoose');
const app=express();
var cors = require('cors')

app.use(cors())
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.listen(5600);