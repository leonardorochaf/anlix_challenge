import { Transform } from 'class-transformer'
import { IsDefined, IsNotEmpty } from 'class-validator'

export class AllPatientsByNameLikeValidationModel {
  @IsDefined()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  name!: string
}
