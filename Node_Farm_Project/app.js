const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/toursRoutes');
const userRouter = require('./routes/usersRoutes');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
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

module.exports = app;