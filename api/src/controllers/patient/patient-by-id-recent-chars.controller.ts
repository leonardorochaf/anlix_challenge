import { PatientNotFoundError } from '@/errors'
import { HttpResponse, notFound, ok, serverError } from '@/helpers'
import { IPatientByIdRecentCharsUsecase } from '@/usecases/patient'
import { IValidator } from '@/validation'
import { AbstractController } from '@/controllers'

export class PatientByIdRecentCharsController extends AbstractController {
  constructor (protected readonly validator: IValidator, private readonly usecase: IPatientByIdRecentCharsUsecase) {
    super(validator)
  }

  protected async perform (httpRequest: PatientByIdRecentCharsRequest): Promise<HttpResponse> {
    try {
      const patientId = +httpRequest.pathParams.patientId
      const { minDate, maxDate } = httpRequest.queryParams
      const minValue = +httpRequest.queryParams.minValue
      const maxValue = +httpRequest.queryParams.maxValue

      const response = await this.usecase.execute({ patientId, minDate, maxDate, minValue, maxValue })

      return ok({
        code: 'PatientByIdRecentCharsSuccess',
        message: 'Características do paciente consultadas com sucesso.',
        data: response
      })
    } catch (error) {
      if (error instanceof PatientNotFoundError) {
        return notFound(error)
      }
      return serverError({
        code: 'PatientByIdRecentCharsServerError',
        message: 'Ops! Ocorreu um erro ao buscar as características do paciente. Tente novamente mais tarde.',
        error
      })
    }
  }
}

export type PatientByIdRecentCharsRequest = {
  pathParams: {
    patientId: string
  }
  queryParams: {
    minDate: string
    maxDate: string
    minValue: string
    maxValue: string
  }
}
