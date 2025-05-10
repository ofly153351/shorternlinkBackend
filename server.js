const express = require('express');
const cors = require('cors');  // แก้จาก import เป็น require ถ้าใช้ CommonJS

const app = express();
const allroute = require('./src/routes/route');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use('/', allroute);

app.listen(3001, () => console.log('Server running on http://localhost:3001'))