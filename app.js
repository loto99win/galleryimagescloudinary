const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

// const app
const app = express();

// configuration
app.use(helmet());
app.use(cors());
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true}));

// connect mongodb
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connection Established'))
    .catch(err => console.log('Connection Failed' + err));

// port
const port = process.env.PORT || 8080;

// routes
const uploadRoute = require('./src/routes/uploadRoutes');

// app listen
app.listen(port, () => console.log(`http://localhost:${port}`));

// request and response
app.use('/api/avatar', uploadRoute);