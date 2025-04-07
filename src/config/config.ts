import "dotenv/config";
import process from "node:process";

export const config = {
  port: process.env.PORT || 8000,
  db: {
    file: process.env.DATABASE_PATH || "file:hospital.db",
  },
};
