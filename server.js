const express = require('express');
const connectDb = require('./config/db');
const app = express();

//Database connect
connectDb();

//Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send({
    message: 'some message'
}))


app.listen(PORT, () => console.log(`server started on port ${PORT}`))