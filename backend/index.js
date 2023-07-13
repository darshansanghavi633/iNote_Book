const connectToMongo = require('./config');
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors())

connectToMongo();

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));



app.listen(5000);
