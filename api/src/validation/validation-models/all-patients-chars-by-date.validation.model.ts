import { IsDateString, IsDefined } from 'class-validator'

export class AllPatientsCharsByDateValidationModel {
  @IsDefined()
  @IsDateString()
  date!: string
}
