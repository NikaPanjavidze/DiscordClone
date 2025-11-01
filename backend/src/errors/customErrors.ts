import { StatusCodes } from "http-status-codes";

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
    constructor (message = "Bad Request"){
        super(message, StatusCodes.BAD_REQUEST)
    }
}

export class UnauthorizedError extends AppError {
    constructor (message = "Unauthorized"){
        super(message, StatusCodes.UNAUTHORIZED)
    }
}

export class NotFoundError extends AppError {
    constructor (message = "Not Found"){
        super(message, StatusCodes.NOT_FOUND)
    }
}