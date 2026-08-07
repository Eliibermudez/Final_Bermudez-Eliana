import mongoose from "mongoose";

export const notFound = (req, res, next) => {
  const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

export const errorHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Error interno del servidor";

  if (error instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = Object.values(error.errors)
      .map((item) => item.message)
      .join(", ");
  }

  if (error instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = "El ID proporcionado no es válido";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};