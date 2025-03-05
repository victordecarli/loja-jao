import { ErrorRequestHandler } from "express";

export const handleAuthErrors: ErrorRequestHandler = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ 
      error: 'Acesso não autorizado',
      details: err.message
    });
    return; // Encerra sem retornar valor
  }
  next(err);
};
