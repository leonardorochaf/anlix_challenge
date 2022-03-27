import { IsDefined, IsNumberString } from 'class-validator'

export class AllPatientsByNameLikeValidationModel {
  @IsDefined()
  @IsNumberString()
  patientId!: string

  @IsDefined()
  @IsNumberString()
  charId!: string
}
