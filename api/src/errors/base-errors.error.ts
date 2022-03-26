export class BadRequestError extends Error {
  constructor (readonly badRequestMessage: string) {
    super(badRequestMessage)
  }
}

export class NotFoundError extends Error {
  constructor (readonly notFoundMessage: string) {
    super(notFoundMessage)
  }
}
