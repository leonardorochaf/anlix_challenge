import { IsDateString, IsDefined, IsNumberString } from 'class-validator'
import { IsAfterThan, IsBeforeThan, IsBiggerThan, IsSmallerThan } from '../custom-validation-decorators'

export class PatientByIdRecentCharsValidationModel {
  @IsDefined()
  @IsNumberString()
  patientId!: string

  @IsDateString()
  @IsBeforeThan('maxDate', { message: 'minDate should be before maxDate' })
  minDate!: string

  @IsDateString()
  @IsAfterThan('minDate', { message: 'maxDate should be bigger than minDate' })
  maxDate!: string

  @IsNumberString()
  @IsSmallerThan('maxValue', { message: 'minValue should be smaller than maxValue' })
  minValue!: string

  @IsNumberString()
  @IsBiggerThan('minValue', { message: 'maxValue should be bigger than minValue' })
  maxValue!: string
}
