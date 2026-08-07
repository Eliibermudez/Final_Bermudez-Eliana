import Monster from "../models/Monster.js";
import Mission from "../models/Mission.js";
import User from "../models/User.js";

import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

export const getMonsters = asyncHandler(async (req, res) => {
  const monsters = await Monster.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: monsters.length,
    monsters,
  });
});

export const getMonsterById = asyncHandler(async (req, res) => {
  const monster = await Monster.findById(req.params.id);

  if (!monster) {
    throw new ApiError("Monstruo no encontrado", 404);
  }

  res.status(200).json({
    success: true,
    monster,
  });
});

export const createMonster = asyncHandler(async (req, res) => {
  const monster = await Monster.create(req.body);

  res.status(201).json({
    success: true,
    message: "Monstruo creado correctamente",
    monster,
  });
});

export const updateMonster = asyncHandler(async (req, res) => {
  const monster = await Monster.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!monster) {
    throw new ApiError("Monstruo no encontrado", 404);
  }

  res.status(200).json({
    success: true,
    message: "Monstruo actualizado correctamente",
    monster,
  });
});

export const deleteMonster = asyncHandler(async (req, res) => {
  const monster = await Monster.findById(req.params.id);

  if (!monster) {
    throw new ApiError("Monstruo no encontrado", 404);
  }

  const assignedMissions = await Mission.countDocuments({
    monster: monster._id,
  });

  if (assignedMissions > 0) {
    throw new ApiError(
      `No se puede eliminar el monstruo porque tiene ${assignedMissions} misión(es) asociada(s)`,
      409
    );
  }

  const associatedUser = await User.findOne({
    monster: monster._id,
  });

  if (associatedUser) {
    throw new ApiError(
      `No se puede eliminar el monstruo porque está asociado al usuario ${associatedUser.username}`,
      409
    );
  }

  await monster.deleteOne();

  res.status(200).json({
    success: true,
    message: "Monstruo eliminado correctamente",
  });
});