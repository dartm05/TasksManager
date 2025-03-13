import { Request, Response, NextFunction } from 'express';
import { Error } from '../../domain/errors/base-error';

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        title: error.title,
        statusCode: error.statusCode,
    });
};