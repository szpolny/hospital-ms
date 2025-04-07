import { RouterContext } from "@oak/oak";
import { PatientService } from "../services/patient.service.ts";
import { NewPatient } from "../repositories/patient.repository.ts";

type CreatePatientPayload = Omit<NewPatient, "id" | "createdAt">;

export class PatientController {
  constructor(private patientService: PatientService) {}

  async createPatient(ctx: RouterContext<"/patients">) {
    try {
      if (!ctx.request.hasBody) {
        ctx.response.status = 400;
        ctx.response.body = { error: "Request body is required" };
        return;
      }
      const body = ctx.request.body;
      if (body.type() !== "json") {
        ctx.response.status = 415;
        ctx.response.body = { error: "Invalid request body type" };
        return;
      }

      const patientData = (await body.json()) as CreatePatientPayload;

      if (!patientData.name || !patientData.dateOfBirth) {
        ctx.response.status = 400;
        ctx.response.body = {
          error: "Missing required fields: name, dateOfBirth",
        };
        return;
      }

      const newPatient = await this.patientService.registerPatient(patientData);
      ctx.response.status = 201;
      ctx.response.body = newPatient;
    } catch (error) {
      throw error;
    }
  }

  async getPatients(ctx: RouterContext<"/patients">) {
    const patients = await this.patientService.getAllPatients();
    ctx.response.body = patients;
  }

  async getPatientById(ctx: RouterContext<"/patients/:id", { id: string }>) {
    const id = parseInt(ctx.params.id, 10);
    if (isNaN(id)) {
      ctx.response.status = 400;
      ctx.response.body = { message: "Invalid patient ID" };
      return;
    }
    const patient = await this.patientService.getPatientById(id);
    if (!patient) {
      ctx.response.status = 404;
      ctx.response.body = { message: `Patient with ID ${id} not found` };
    } else {
      ctx.response.body = patient;
    }
  }
}
