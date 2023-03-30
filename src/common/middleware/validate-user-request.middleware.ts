import { Request, Response, NextFunction } from 'express';

export function validateUserRequest(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    console.log(`Request...`);
    const { user, body } = req;
    console.log(user, body);
    next();
}
