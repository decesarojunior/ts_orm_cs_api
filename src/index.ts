import 'reflect-metadata';
import express from 'express';

import './database/connect.ts'
import routes  from './routes';


const app = express();

app.use(express.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    next();
});


app.use(routes);

app.listen(3000, () => console.log('Server started at http://localhost:3000'));

