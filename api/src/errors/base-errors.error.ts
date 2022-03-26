export class BadRequestError extends Error {
  constructor (readonly badRequestMessage: string) {
    super(badRequestMessage)
  }
}
