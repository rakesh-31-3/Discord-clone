// const errorHandler = (err, _, res) => {
  
//     //Extract the status code and message from the error received
//     const statusCode = err.status || 500;
//     const message = err.message || "Internal Server Error";
  
//     //Send response with status code and error message
//     res.status(statusCode).json({
//       code: statusCode,
//       error: {
//         message,
//       },
//     });
//   };
  
//   export default errorHandler;
  
//   // const dotenv = require("dotenv");
// dotenv.config();
const sendError = (error, res) => {
  const statusCode = error.statusCode || 500;
  const status = error.status || "error";
  const message = error.message;
  const stack = error.stack;
  res.status(statusCode).json({
    status,
    message,
    stack,
  });
};
// const sendErrorProd = (error, res) => {
//   const statusCode = error.statusCode || 500;
//   const status = error.status || "error";
//   const message = error.message;
//   const stack = error.stack;
//   if (error.isOperational) {
//     return res.status(statusCode).json({
//       status,
//       message,
//     });
//   }
//   return res.status(500).send({
//     status: "error",
//     message: "Something went Wrong try again!",
//   });
// };
const globalErrorHandler = (err, req, res, next) => {
  return sendError(err, res);
};

export default globalErrorHandler;
