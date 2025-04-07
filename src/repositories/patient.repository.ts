import { eq } from "drizzle-orm";
import { db } from "../db/index.ts";
import { patients } from "../db/schema.ts";

export type NewPatient = typeof patients.$inferInsert;
export type Patient = typeof patients.$inferSelect;

export class PatientRepository {
  async create(newPatient: NewPatient): Promise<Patient> {
    const result = await db.insert(patients).values(newPatient).returning();
    return result[0];
  }

  async findAll(): Promise<Patient[]> {
    return await db.select().from(patients);
  }

  async findById(id: number): Promise<Patient | undefined> {
    const result = await db.select().from(patients).where(eq(patients.id, id));
    return result[0];
  }

  async update(
    id: number,
    updatedPatient: Partial<NewPatient>,
  ): Promise<Patient | undefined> {
    const result = await db
      .update(patients)
      .set(updatedPatient)
      .where(eq(patients.id, id))
      .returning();
    return result[0];
  }

  async delete(id: number): Promise<void> {
    await db.delete(patients).where(eq(patients.id, id));
  }
}
