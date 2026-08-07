import mongoose from "mongoose";

const monsterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
    },

    type: {
      type: String,
      required: [true, "El tipo es obligatorio"],
      trim: true,
    },

    energy: {
      type: Number,
      required: [true, "La energía es obligatoria"],
      min: [0, "La energía no puede ser negativa"],
      default: 0,
    },

    status: {
      type: String,
      enum: ["Activo", "En entrenamiento", "Inactivo"],
      default: "Activo",
    },

    description: {
      type: String,
      trim: true,
      default: "Monstruo registrado en ScreamFactory.",
    },

    image: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Monster = mongoose.model("Monster", monsterSchema);

export default Monster;