import { IsDateString, IsDefined } from 'class-validator'

export class AllPatientsByNameLikeValidationModel {
  @IsDefined()
  @IsDateString()
  date!: string
}
