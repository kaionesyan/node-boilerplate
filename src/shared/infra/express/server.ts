import 'reflect-metadata';
import 'express-async-errors';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import AppError from '@shared/errors/AppError';
import router from './routes';

// Initialize app here
(async () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(router);

  app.use(errors());
  app.use(
    (error: Error, request: Request, response: Response, _: NextFunction) => {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({
          error: error.error,
          details: error.details,
        });
      }

      // eslint-disable-next-line no-console
      console.error(error);
      return response.status(500).json({
        error: 'INTERNAL_SERVER_ERROR',
      });
    },
  );

  const PORT = process.env.PORT || 3333;
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${PORT}`);
  });
})();
