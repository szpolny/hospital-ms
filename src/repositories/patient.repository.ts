import { patients } from "../db/schema.ts";

export type NewPatient = typeof patients.$inferInsert;
export type Patient = typeof patients.$inferSelect;
