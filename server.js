const express = require('express');
const cors = require('cors');  // แก้จาก import เป็น require ถ้าใช้ CommonJS

const app = express();
const allroute = require('./src/routes/route');

const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: ['https://shorternurlreact-1.onrender.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/', allroute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});