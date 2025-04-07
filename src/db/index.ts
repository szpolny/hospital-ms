import { drizzle } from "drizzle-orm/libsql";
import { config } from "../config/config.ts";
import * as schema from "./schema.ts";
import { createClient } from "@libsql/client/node";

const client = createClient({ url: config.db.file });
export const db = drizzle({ client, schema });
