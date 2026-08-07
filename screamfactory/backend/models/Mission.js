import mongoose from "mongoose";

const missionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El nombre de la misión es obligatorio"],
      trim: true,
      minlength: [3, "El nombre debe tener al menos 3 caracteres"],
    },

    monster: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Monster",
      required: [true, "El monstruo asignado es obligatorio"],
    },

    energy: {
      type: Number,
      required: [true, "La energía esperada es obligatoria"],
      min: [1, "La energía debe ser mayor que cero"],
    },

    status: {
      type: String,
      enum: ["Pendiente", "En progreso", "Completada"],
      default: "Pendiente",
    },

    description: {
      type: String,
      trim: true,
      default: "Misión energética de ScreamFactory.",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Mission = mongoose.model("Mission", missionSchema);

export default Mission;