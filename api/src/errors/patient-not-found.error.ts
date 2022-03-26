import { NotFoundError } from './base-errors.error'

export class PatientNotFoundError extends NotFoundError {
  constructor (readonly message: string) {
    super(message)
    this.name = 'PatientNotFoundError'
  }
}
