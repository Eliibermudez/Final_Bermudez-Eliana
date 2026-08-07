import Mission from "../models/Mission.js";
import Monster from "../models/Monster.js";
import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

export const getMissions = asyncHandler(async (req, res) => {
  let filter = {};

  if (req.user.role === "employee") {
    if (!req.user.monster) {
      throw new ApiError(
        "El usuario no tiene un monstruo asociado",
        400
      );
    }

    filter = {
      monster: req.user.monster,
    };
  }

  const missions = await Mission.find(filter)
    .populate("monster", "name type energy status image")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: missions.length,
    missions,
  });
});

export const getMissionById = asyncHandler(async (req, res) => {
  const mission = await Mission.findById(req.params.id).populate(
    "monster",
    "name type energy status image"
  );

  if (!mission) {
    throw new ApiError("Misión no encontrada", 404);
  }

  if (
    req.user.role === "employee" &&
    mission.monster._id.toString() !== req.user.monster?.toString()
  ) {
    throw new ApiError(
      "No tenés permisos para acceder a esta misión",
      403
    );
  }

  res.status(200).json({
    success: true,
    mission,
  });
});

export const createMission = asyncHandler(async (req, res) => {
  const { monster } = req.body;

  const assignedMonster = await Monster.findById(monster);

  if (!assignedMonster) {
    throw new ApiError("El monstruo asignado no existe", 404);
  }

  const mission = await Mission.create(req.body);

  await mission.populate(
    "monster",
    "name type energy status image"
  );

  res.status(201).json({
    success: true,
    message: "Misión creada correctamente",
    mission,
  });
});

export const updateMission = asyncHandler(async (req, res) => {
  const existingMission = await Mission.findById(req.params.id);

  if (!existingMission) {
    throw new ApiError("Misión no encontrada", 404);
  }

  if (req.user.role === "employee") {
    if (
      existingMission.monster.toString() !==
      req.user.monster?.toString()
    ) {
      throw new ApiError(
        "No tenés permisos para modificar esta misión",
        403
      );
    }

    const allowedStatus = ["Pendiente", "En progreso", "Completada"];

    if (
      !req.body.status ||
      !allowedStatus.includes(req.body.status)
    ) {
      throw new ApiError(
        "Solo podés actualizar el estado de la misión",
        400
      );
    }

    existingMission.status = req.body.status;
    await existingMission.save();

    await existingMission.populate(
      "monster",
      "name type energy status image"
    );

    return res.status(200).json({
      success: true,
      message: "Estado de la misión actualizado correctamente",
      mission: existingMission,
    });
  }

  if (req.body.monster) {
    const assignedMonster = await Monster.findById(req.body.monster);

    if (!assignedMonster) {
      throw new ApiError("El monstruo asignado no existe", 404);
    }
  }

  const mission = await Mission.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  ).populate("monster", "name type energy status image");

  res.status(200).json({
    success: true,
    message: "Misión actualizada correctamente",
    mission,
  });
});

export const deleteMission = asyncHandler(async (req, res) => {
  const mission = await Mission.findByIdAndDelete(req.params.id);

  if (!mission) {
    throw new ApiError("Misión no encontrada", 404);
  }

  res.status(200).json({
    success: true,
    message: "Misión eliminada correctamente",
  });
});