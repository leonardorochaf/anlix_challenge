import { BadRequestError } from '@/errors'

export class ValidationError extends BadRequestError {
  constructor (public readonly errorObjects: Array<{
    messages: string[]
    value: string
    property: string
  }>) {
    super('Houve um problema ao processar sua solicitação. Por favor, tente novamente mais tarde.')
    this.name = 'ValidationError'
  }
}
