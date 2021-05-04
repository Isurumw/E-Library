import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import { IBookAuthor } from "@models/book-author";
import BookAuthorDao from '@daos/book-author-dao';

const bookAuthorDao = new BookAuthorDao();
const { BAD_REQUEST, CREATED, OK, INTERNAL_SERVER_ERROR } = StatusCodes;



/**
 * Get all authors.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const getAllAuthors = async (req: Request, res: Response) => {
    try {
        const result = await bookAuthorDao.getAll();
        return res.status(OK).json(result);
    } catch (e) {
        return res.status(INTERNAL_SERVER_ERROR).json(e);
    }
}


/**
 * Add one author.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const addOneAuthor = async (req: Request, res: Response) => {
    const author = req.body as IBookAuthor;
    try {
        const result = await bookAuthorDao.add(author);
        return res.status(CREATED).json(result);
    } catch (e) {
        return res.status(BAD_REQUEST).json(e);
    }
    
}

/**
 * Update one author.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 export const updateOneAuthor = async (req: Request, res: Response) => {
    const author = req.body as IBookAuthor;
    try {
        const result = await bookAuthorDao.update(author);
        return res.status(CREATED).json(result);
    } catch (e) {
        return res.status(BAD_REQUEST).json(e);
    }
    
}

/**
 * delete one author.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 export const removeOneUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await bookAuthorDao.remove(id);
        return res.status(CREATED).json(result);
    } catch (e) {
        return res.status(BAD_REQUEST).json(e);
    }
    
}
