import express from "express";
import {getMonsters,getMonsterById,createMonster,updateMonster,deleteMonster,} from "../controllers/monsterController.js";
import {protect,authorize,} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getMonsters);
router.get("/:id", protect, getMonsterById);

router.post(
  "/",
  protect,
  authorize("admin"),
  createMonster
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateMonster
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteMonster
);

export default router;