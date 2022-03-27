import { PatientNotFoundError } from '@/errors/patient-not-found.error'
import { HttpResponse, notFound, ok, serverError } from '@/helpers'
import { IPatientByIdRecentCharByIdUsecase } from '@/usecases/patient'
import { IValidator } from '@/validation'
import { AbstractController } from '@/controllers'

export class PatientByIdRecentCharByIdController extends AbstractController {
  constructor (protected readonly validator: IValidator, private readonly usecase: IPatientByIdRecentCharByIdUsecase) {
    super(validator)
  }

  protected async perform (httpRequest: PatientByIdRecentCharByIdRequest): Promise<HttpResponse> {
    try {
      const patientId = +httpRequest.pathParams.patientId
      const charId = +httpRequest.pathParams.charId

      const response = await this.usecase.execute({ patientId, charId })

      return ok({
        code: 'PatientByIdRecentCharByIdSuccess',
        message: 'Característica do paciente consultada com sucesso.',
        data: response
      })
    } catch (error) {
      if (error instanceof PatientNotFoundError) {
        return notFound(error)
      }
      return serverError({
        code: 'PatientByIdRecentCharByIdServerError',
        message: 'Ops! Ocorreu um erro ao buscar a característica do paciente. Tente novamente mais tarde.',
        error
      })
    }
  }
}

export type PatientByIdRecentCharByIdRequest = {
  pathParams: {
    patientId: string
    charId: string
  }
}
