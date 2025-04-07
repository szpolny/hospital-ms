import {
  NewPatient,
  Patient,
  PatientRepository,
} from "../repositories/patient.repository.ts";

export class PatientService {
  constructor(private patientRepository: PatientRepository) {}

  async registerPatient(
    patientData: Omit<NewPatient, "id" | "createdAt">,
  ): Promise<Patient> {
    // TODO: Add validation logic here
    return await this.patientRepository.create({
      ...patientData,
    });
  }

  async getAllPatients(): Promise<Patient[]> {
    return await this.patientRepository.findAll();
  }

  async getPatientById(id: number): Promise<Patient | undefined> {
    const patient = await this.patientRepository.findById(id);
    if (!patient) {
      console.warn(`Patient with ID ${id} not found.`);
    }
    return patient;
  }

  // TODO: Add more methods for updating and deleting patients
}
