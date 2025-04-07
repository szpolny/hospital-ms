import { Router } from "@oak/oak";
import { PatientRepository } from "../repositories/patient.repository.ts";
import { PatientService } from "../services/patient.service.ts";
import { PatientController } from "../controllers/patient.controller.ts";

const patientRepository = new PatientRepository();
const patientService = new PatientService(patientRepository);
const patientController = new PatientController(patientService);

const patientRouter = new Router();

patientRouter
  .post("/patients", patientController.createPatient.bind(patientController))
  .get("/patients", patientController.getPatients.bind(patientController))
  .get(
    "/patients/:id",
    patientController.getPatientById.bind(patientController),
  );

export default patientRouter;
