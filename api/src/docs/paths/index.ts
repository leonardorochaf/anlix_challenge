import { patientByNameLikePath, allPatientsCharsByDatePath, PatientByIdRecentCharsPath, PatientByIdRecentCharPath } from './patient.paths.swagger'
import { allCharacteristicTypes } from './characteristic-type.paths.swagger'

export default {
  '/patients': patientByNameLikePath,
  '/patients/characs': allPatientsCharsByDatePath,
  '/patients/{patientId}/characs': PatientByIdRecentCharsPath,
  '/patients/{patientId}/characs/{characId}': PatientByIdRecentCharPath,
  '/charactypes': allCharacteristicTypes
}
