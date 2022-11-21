const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
require('dotenv').config();

global.basedir = __dirname;

const authRouter = require('./core/auth/authRouter');
const userRouter = require('./core/user/userRouter');
const categoryRouter = require('./core/category/categoryRouter');
const transactionRouter = require('./core/transaction/transactionRouter');
const reportRouter = require('./core/report/reportRouter');

const { errorHandler } = require('./middleware');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/auth', authRouter);

app.use('/api/user', userRouter);

app.use('/api/categories', categoryRouter);

app.use('/api/transactions', transactionRouter);

app.use('/api/reports', reportRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(errorHandler);

module.exports = app;
