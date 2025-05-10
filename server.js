const express = require('express');
const cors = require('cors');  // แก้จาก import เป็น require ถ้าใช้ CommonJS

const app = express();
const allroute = require('./src/routes/route');

const PORT = process.env.PORT || 3001;

const allowedOrigins = [
    'https://shorternurlreact-1.onrender.com',
    'http://localhost:3000'
];


app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/', allroute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});