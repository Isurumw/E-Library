import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import { IBook } from "@models/book";
import BookDao, { BookSearch } from '@daos/book-dao';

const bookDao = new BookDao();
const { BAD_REQUEST, CREATED, OK, INTERNAL_SERVER_ERROR } = StatusCodes;



/**
 * Get all books.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const result = await bookDao.getAll();
        return res.status(OK).json(result);
    } catch (e) {
        return res.status(INTERNAL_SERVER_ERROR).json(e);
    }
}


/**
 * Add one book.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const addOneBook = async (req: Request, res: Response) => {
    const book = req.body as IBook;
    try {
        const result = await bookDao.add(book);
        return res.status(CREATED).json(result);
    } catch (e) {
        return res.status(BAD_REQUEST).json(e);
    }
    
}

/**
 * search books.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 export const searchBooks = async (req: Request, res: Response) => {
    const params = req.body as BookSearch;
    try {
        const result = await bookDao.search(params);
        return res.status(CREATED).json(result);
    } catch (e) {
        return res.status(BAD_REQUEST).json(e);
    }
    
}

/**
 * Update one book.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 export const updateOneBook = async (req: Request, res: Response) => {
    const book = req.body as IBook;
    try {
        const result = await bookDao.update(book);
        return res.status(CREATED).json(result);
    } catch (e) {
        return res.status(BAD_REQUEST).json(e);
    }
    
}

/**
 * delete one book.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 export const removeOneUBook = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await bookDao.remove(id);
        return res.status(CREATED).json(result);
    } catch (e) {
        return res.status(BAD_REQUEST).json(e);
    }
    
}
