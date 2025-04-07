import { eq } from "drizzle-orm";
import { db } from "../db/index.ts";
import { doctors } from "../db/schema.ts";

export type NewDoctor = typeof doctors.$inferInsert;
export type Doctor = typeof doctors.$inferSelect;

export class DoctorRepository {
  async create(newDoctor: NewDoctor): Promise<Doctor> {
    const result = await db.insert(doctors).values(newDoctor).returning();
    return result[0];
  }

  async findAll(): Promise<Doctor[]> {
    return await db.select().from(doctors);
  }

  async findById(id: number): Promise<Doctor | undefined> {
    const result = await db.select().from(doctors).where(eq(doctors.id, id));
    return result[0];
  }

  async update(
    id: number,
    updatedDoctor: Partial<NewDoctor>,
  ): Promise<Doctor | undefined> {
    const result = await db
      .update(doctors)
      .set(updatedDoctor)
      .where(eq(doctors.id, id))
      .returning();
    return result[0];
  }

  async delete(id: number): Promise<void> {
    await db.delete(doctors).where(eq(doctors.id, id));
  }
}
