import { drizzle } from "drizzle-orm/libsql";
import { config } from "../config/config.ts";
import * as schema from "./schema.ts";

export const db = drizzle(config.db.file, { schema });
