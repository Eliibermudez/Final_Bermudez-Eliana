import User from "../models/User.js";
import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import generateToken from "../utils/generateToken.js";

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(
      "El usuario y la contraseña son obligatorios",
      400
    );
  }

  const user = await User.findOne({
    username: username.toLowerCase(),
  })
    .select("+password")
    .populate("monster", "name type energy status image");

  if (!user) {
    throw new ApiError("Usuario o contraseña incorrectos", 401);
  }

  const validPassword = await user.comparePassword(password);

  if (!validPassword) {
    throw new ApiError("Usuario o contraseña incorrectos", 401);
  }

  const token = generateToken(user);

  res.status(200).json({
    success: true,
    message: "Inicio de sesión exitoso",
    token,
    user: {
      id: user._id,
      name: user.name,
      username: user.username,
      role: user.role,
      monster: user.monster,
    },
  });
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate(
    "monster",
    "name type energy status image"
  );

  if (!user) {
    throw new ApiError("Usuario no encontrado", 404);
  }

  res.status(200).json({
    success: true,
    user,
  });
});