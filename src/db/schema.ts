import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const patients = sqliteTable("patients", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  contactNumber: text("contact_number"),
  address: text("address"),
  createdAt: int("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const doctors = sqliteTable("doctors", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  specialization: text("specialization").notNull(),
  contactNumber: text("contact_number"),
  createdAt: int("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const appointments = sqliteTable("appointments", {
  id: int("id").primaryKey({ autoIncrement: true }),
  patientId: int("patient_id")
    .notNull()
    .references(() => patients.id),
  doctorId: int("doctor_id")
    .notNull()
    .references(() => doctors.id),
  appointmentDate: int("appointment_date", { mode: "timestamp_ms" })
    .notNull(), // Store timestamp
  reason: text("reason"),
  status: text("status", { enum: ["scheduled", "completed", "cancelled"] })
    .notNull()
    .$default(() => "scheduled"),
  createdAt: int("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const patientsRelations = relations(patients, ({ many }) => ({
  appointments: many(appointments),
}));

export const doctorsRelations = relations(doctors, ({ many }) => ({
  appointments: many(appointments),
}));

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  patient: one(patients, {
    fields: [appointments.patientId],
    references: [patients.id],
  }),
  doctor: one(doctors, {
    fields: [appointments.doctorId],
    references: [doctors.id],
  }),
}));
