import { ValidationError } from '@/errors'

export interface IValidator {
  validate: (data: any) => Promise<ValidationError | null>
}
