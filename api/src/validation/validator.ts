import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

import { IValidator } from '@/validation'
import { ValidationError } from '@/errors'

export class Validator implements IValidator {
  constructor (private readonly validatorModel: any) { }

  async validate (data: any): Promise<ValidationError | null> {
    const errors = await validate(plainToClass(this.validatorModel, data), { skipMissingProperties: true })
    if (errors.length === 0) {
      return null
    }

    const validationErrorModel: Array<{
      messages: string[]
      value: string
      property: string
    }> = []

    errors.forEach((error) => {
      const validationErrorMessages: string[] = []
      for (const key in error.constraints) {
        validationErrorMessages.push(error.constraints[key])
      }
      validationErrorModel.push({
        messages: validationErrorMessages,
        value: error.value,
        property: error.property
      })
    })
    return new ValidationError(validationErrorModel)
  }
}
