import { IsDefined, IsNotEmpty } from 'class-validator'

export class AllPatientsByNameLikeValidationModel {
  @IsDefined()
  @IsNotEmpty()
  name!: string
}
