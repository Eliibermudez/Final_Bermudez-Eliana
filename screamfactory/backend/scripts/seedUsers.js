import dotenv from "dotenv";
import connectDB from "../config/database.js";
import User from "../models/User.js";
import Monster from "../models/Monster.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await connectDB();

    const mikeMonster = await Monster.findOneAndUpdate(
      {
        name: { $regex: /^mike$/i },
      },
      {
        $setOnInsert: {
          name: "Mike",
          type: "Coordinador",
          energy: 78,
          status: "Activo",
          description:
            "Coordinador de misiones energéticas de ScreamFactory.",
          image: "mike.png",
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    await User.deleteMany({
      username: { $in: ["roz", "mike"] },
    });

    await User.create([
      {
        name: "Roz",
        username: "roz",
        password: process.env.ADMIN_PASSWORD,
        role: "admin",
      },
      {
        name: "Mike Wazowski",
        username: "mike",
        password: process.env.EMPLOYEE_PASSWORD,
        role: "employee",
        monster: mikeMonster._id,
      },
    ]);

    console.log("Usuarios de prueba creados correctamente");
    console.log(`Mike asociado al monstruo: ${mikeMonster._id}`);

    process.exit(0);
  } catch (error) {
    console.error("Error al crear usuarios:", error.message);
    process.exit(1);
  }
};

seedUsers();