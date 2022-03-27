import { HttpRequest, HttpResponse, ok, serverError } from '@/helpers'
import { IAllCharacteristicTypesUsecase } from '@/usecases/characteristic-type'
import { AbstractController } from '@/controllers'

export class AllCharacteristicTypesController extends AbstractController {
  constructor (private readonly usecase: IAllCharacteristicTypesUsecase) {
    super()
  }

  protected async perform (_httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const response = await this.usecase.execute()

      return ok({
        code: 'AllCharacteristicTypesSuccess',
        message: 'Tipos de caracteristicas consultadas com sucesso.',
        data: response
      })
    } catch (error) {
      return serverError({
        code: 'AllCharacteristicTypesServerError',
        message: 'Ops! Ocorreu um erro ao buscar os tipos de caracteristicas. Tente novamente mais tarde.',
        error
      })
    }
  }
}
