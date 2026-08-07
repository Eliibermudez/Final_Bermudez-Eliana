import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },

    username: {
      type: String,
      required: [true, "El usuario es obligatorio"],
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [4, "La contraseña debe tener al menos 4 caracteres"],
      select: false,
    },

    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee",
    },

    monster: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Monster",
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});

/* Compara la contraseña ingresada con la almacenada */
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;