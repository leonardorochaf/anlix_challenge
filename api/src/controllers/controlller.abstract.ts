import { badRequest, HttpRequest, HttpResponse, serverError } from '@/helpers'
import { IValidator } from '@/validation'

export abstract class AbstractController {
  constructor (protected readonly validator?: IValidator) { }

  protected abstract perform (httpRequest: HttpRequest): Promise<HttpResponse>

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      if (this.validator) {
        const validationErrors = await this.validator.validate({ ...request.pathParams, ...request.queryParams, ...request.body })
        if (validationErrors) {
          return badRequest(validationErrors)
        }
      }

      return await this.perform(request)
    } catch (error) {
      return serverError({
        code: 'ServerError',
        message: 'Ops! Ocorreu um erro. Por favor, tente novamente mais tarde.',
        error
      })
    }
  }
}
