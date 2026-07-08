// backend/middleware/loggerMiddleware.js

export function logger(req, res, next) {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
}



