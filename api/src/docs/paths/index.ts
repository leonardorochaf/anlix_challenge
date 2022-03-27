import { patientByNameLikePath, allPatientsCharsByDatePath, PatientByIdRecentCharsPath, PatientByIdRecentCharPath } from './patient.paths.swagger'
import { allCharacteristicTypes } from './characteristic-type.paths.swagger'

export default {
  '/patients': patientByNameLikePath,
  '/patients/chars': allPatientsCharsByDatePath,
  '/patients/{patientId}/chars': PatientByIdRecentCharsPath,
  '/patients/{patientId}/chars/{charId}': PatientByIdRecentCharPath,
  '/char-types': allCharacteristicTypes
}
