import { IsDefined, IsNumberString } from 'class-validator'

export class PatientByIdRecentCharByIdValidationModel {
  @IsDefined()
  @IsNumberString()
  patientId!: string

  @IsDefined()
  @IsNumberString()
  charId!: string
}
