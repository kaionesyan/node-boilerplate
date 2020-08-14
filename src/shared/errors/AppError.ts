type AppErrorType = 'UNKNOWN_ERROR';

interface _Constructor {
  error: AppErrorType;
  statusCode: number;
  details?: string;
}

class AppError {
  readonly error: AppErrorType;

  readonly statusCode: number;

  readonly details?: string;

  constructor(data: _Constructor) {
    this.error = data.error;
    this.statusCode = data.statusCode;
    this.details = data.details;
  }
}

export default AppError;
