import express from "express";
import {getMissions,getMissionById,createMission,updateMission,deleteMission,} from "../controllers/missionController.js";
import {protect,authorize,} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getMissions);
router.get("/:id", protect, getMissionById);

router.post(
  "/",
  protect,
  authorize("admin"),
  createMission
);

router.put(
  "/:id",
  protect,
  updateMission
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteMission
);

export default router;