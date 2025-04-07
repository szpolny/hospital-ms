import { eq } from "drizzle-orm";
import { db } from "../db/index.ts";
import { appointments } from "../db/schema.ts";

export type NewAppointment = typeof appointments.$inferInsert;
export type Appointment = typeof appointments.$inferSelect;

export class AppointmentRepository {
  async create(newAppointment: NewAppointment): Promise<Appointment> {
    const result = await db
      .insert(appointments)
      .values(newAppointment)
      .returning();
    return result[0];
  }

  async findAll(): Promise<Appointment[]> {
    return await db.select().from(appointments);
  }
  async findById(id: number): Promise<Appointment | undefined> {
    const result = await db
      .select()
      .from(appointments)
      .where(eq(appointments.id, id));
    return result[0];
  }

  async update(
    id: number,
    updatedAppointment: Partial<NewAppointment>,
  ): Promise<Appointment | undefined> {
    const result = await db
      .update(appointments)
      .set(updatedAppointment)
      .where(eq(appointments.id, id))
      .returning();
    return result[0];
  }

  async delete(id: number): Promise<void> {
    await db.delete(appointments).where(eq(appointments.id, id));
  }
}
