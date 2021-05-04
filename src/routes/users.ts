import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import { IUser } from "@models/user";
import UserDao from '@daos/user-dao';

const userDao = new UserDao();
const { BAD_REQUEST, CREATED, OK, INTERNAL_SERVER_ERROR } = StatusCodes;



/**
 * Get all users.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userDao.getAll();
        return res.status(OK).json(result);
    } catch (e) {
        return res.status(INTERNAL_SERVER_ERROR).json(e);
    }
}


/**
 * Add one user.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const addOneUser = async (req: Request, res: Response) => {
    const user = req.body as IUser;
    try {
        const result = await userDao.add(user);
        return res.status(CREATED).json(result);
    } catch (e) {
        return res.status(BAD_REQUEST).json(e);
    }
    
}

/**
 * Update one user.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 export const updateOneUser = async (req: Request, res: Response) => {
    const user = req.body as IUser;
    try {
        const result = await userDao.update(user);
        return res.status(CREATED).json(result);
    } catch (e) {
        return res.status(BAD_REQUEST).json(e);
    }
    
}
