import { AbstractController } from '@/controllers'
import { HttpResponse, ok, serverError } from '@/helpers'
import { IAllPatientsByNameLikeUsecase } from '@/usecases/patient'
import { IValidator } from '@/validation'

export class AllPatientsByNameLikeController extends AbstractController {
  constructor (protected readonly validator: IValidator, private readonly usecase: IAllPatientsByNameLikeUsecase) {
    super(validator)
  }

  protected async perform (request: AllPatientsByNameLikeRequest): Promise<HttpResponse> {
    try {
      const name = request.queryParams.name.toLowerCase()

      const response = await this.usecase.execute({ name })

      return ok({
        code: 'PatientsByNameLikeSuccess',
        message: 'Pacientes encontrados com sucesso.',
        data: response
      })
    } catch (error) {
      return serverError({
        code: 'PatientsByNameLikeServerError',
        message: 'Ops! Ocorreu um erro ao buscar os pacientes. Tente novamente mais tarde.',
        error
      })
    }
  }
}

export type AllPatientsByNameLikeRequest = {
  queryParams: {
    name: string
  }
}
