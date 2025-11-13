class AppError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends Error {
  name: string = "NotFoundError";

  constructor(entity = "Resource") {
    super(`${entity} not found`);
  }
}

export default AppError;