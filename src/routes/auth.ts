import { Request, Response } from 'express';
import expressJwt from 'express-jwt'; 
import StatusCodes from 'http-status-codes';

import { IUser } from "@models/user";
import AuthDao from '@daos/auth-dao';
import { secretKey } from '@shared/constants';

const authDao = new AuthDao();
const { BAD_REQUEST, OK, UNAUTHORIZED } = StatusCodes;

/**
 * Signup.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 export const signup = async (req: Request, res: Response) => {
    const user = req.body as IUser;
    try {
        const result = await authDao.register(user);
        return res.status(OK).json(result);
    } catch (e) {
        return res.status(BAD_REQUEST).json(e);
    }
}

/**
 * Signin.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 export const signin = async (req: Request, res: Response) => {
     const user = req.body as IUser;
    try {
        const result = await authDao.authenticate(user);
        return res.status(OK).json(result);
    } catch (e) {
        return res.status(UNAUTHORIZED).json(e);
    }
}

/**
 * is locally authenticated.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 export const isLocalAuthenticated = expressJwt({secret: secretKey, algorithms: ["HS256"]});


