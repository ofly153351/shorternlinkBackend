const express = require('express');
const cors = require('cors');  // แก้จาก import เป็น require ถ้าใช้ CommonJS

const app = express();
const allroute = require('./src/routes/route');

const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use('/', allroute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});