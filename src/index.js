require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));

require('./controllers/authController')(app);
require('./controllers/clientController')(app);
require('./controllers/adressesController')(app);
require('./controllers/invoicesController')(app);
require('./controllers/insuredController')(app);

app.listen(process.env.PORT || 3333);
