require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./router/index');

const PORT = process.env.SERVER_PORT;
const app = express();

// Middleware
// app.use(morgan('dev')); when testing k6 comment this
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server available at http://localhost:${PORT}`);
});
