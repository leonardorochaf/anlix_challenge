import { HttpResponse, ok, serverError } from '@/helpers'
import { IAllPatientsCharsByDateUsecase } from '@/usecases/patient'
import { IValidator } from '@/validation'
import { AbstractController } from '@/controllers'

export class AllPatientsCharsByDateController extends AbstractController {
  constructor (protected readonly validator: IValidator, private readonly usecase: IAllPatientsCharsByDateUsecase) {
    super(validator)
  }

  protected async perform (httpRequest: AllPatientsCharsByDateRequest): Promise<HttpResponse> {
    try {
      const date = httpRequest.queryParams.date

      const response = await this.usecase.execute({ date })

      return ok({
        code: 'AllPatientsCharsByDateSucess',
        message: 'Características dos pacientes consultadas com sucesso.',
        data: response
      })
    } catch (error) {
      return serverError({
        code: 'AllPatientsCharsByDateServerError',
        message: 'Ops! Ocorreu um erro ao buscar as características dos pacientes. Tente novamente mais tarde.',
        error
      })
    }
  }
}

export type AllPatientsCharsByDateRequest = {
  queryParams: {
    date: string
  }
}
