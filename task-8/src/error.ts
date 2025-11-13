class AppError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends AppError {
  name: string = "NotFoundError";

  constructor(entity = "Resource") {
    super(`${entity} not found`, 404);
  }
}

export default AppError;