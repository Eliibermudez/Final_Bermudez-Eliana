import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "./asyncHandler.js";
import ApiError from "../utils/ApiError.js";

export const protect = asyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    throw new ApiError(
      "Acceso denegado. Token no proporcionado",
      401
    );
  }

  const token = authorization.split(" ")[1];

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw new ApiError("Token inválido o vencido", 401);
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new ApiError(
      "El usuario asociado al token ya no existe",
      401
    );
  }

  req.user = user;
  next();
});

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ApiError(
          "No tenés permisos para realizar esta acción",
          403
        )
      );
    }

    next();
  };
};