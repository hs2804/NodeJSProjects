const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/toursRoutes');
const userRouter = require('./routes/usersRoutes');

const app = express();
app.use(express.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));

if(process.env.REGION === 'development'){
  app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public/`));

app.use((req, res, next) => {
  console.log('Hello From Custom Middleware 👋');
  next();
});
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all("*", (req, res, next) => {
   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
