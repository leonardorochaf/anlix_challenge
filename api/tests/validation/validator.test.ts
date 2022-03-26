
import * as classValidator from 'class-validator'
import * as classTransformer from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

import { Validator } from '@/validation'
import { ValidationError } from '@/errors'

const mockedData = {}
class StubValidationModel {
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Email em formato inválido' })
  email!: string

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @IsString({ message: 'Senha em formato inválido' })
  password!: string
}

describe('Validator', () => {
  let sut: Validator

  beforeEach(() => {
    sut = new Validator(StubValidationModel)
  })

  test('Should return null if ClassValidator dont return an error', async () => {
    jest.spyOn(classValidator, 'validate').mockResolvedValueOnce([])

    const response = await sut.validate(mockedData)

    expect(response).toBeNull()
  })

  test('Should return a ValidationError if ClassValidator return an error', async () => {
    jest.spyOn(classValidator, 'validate').mockResolvedValueOnce([{
      constraints: {
        IsNotEmpty: 'Email é obrigatório'
      },
      property: 'any_property',
      value: 'any_value'
    }])

    const response = await sut.validate(mockedData)

    expect(response).toEqual(new ValidationError([]))
    expect(response?.errorObjects.length).toBe(1)
    expect(response?.errorObjects[0].messages[0]).toBe('Email é obrigatório')
    expect(response?.errorObjects[0].property).toBe('any_property')
    expect(response?.errorObjects[0].value).toBe('any_value')
  })

  test('Should throw if ClassValidator throws', async () => {
    jest.spyOn(classValidator, 'validate').mockRejectedValueOnce(new Error())

    const promise = sut.validate({})

    await expect(promise).rejects.toThrow()
  })

  test('Should throw if ClassTransformer throws', async () => {
    jest.spyOn(classTransformer, 'plainToClass').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.validate({})

    await expect(promise).rejects.toThrow()
  })
})
