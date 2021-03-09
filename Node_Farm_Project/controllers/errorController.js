const AppError = require('../utils/appError');
const handleCastErrorDB = err => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return (new AppError(message, 400));
}
const sendErrorDev = (err, res ) => {
  res.status(err.statusCode).json({
  status: err.status,
  name: err.name,
  message: err.message,
  stack: err.stack,
  error: err
}); 
}
const sendErrorPROD = (err, res) => {
  if(err.isOperational){
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }else {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong on the server!'
    });
  } 
}

module.exports = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if(process.env.NODE_ENV === "development"){
      sendErrorDev(err,res);
    }else if (process.env.NODE_ENV === "production"){
      let error = {...err};
      if(err.name === 'CastError') error = handleCastErrorDB(error);
      sendErrorPROD(error, res);
    } 
  }
