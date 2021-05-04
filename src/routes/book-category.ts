import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import { IBookCategory } from "@models/book-category";
import BookCategoryDao from '@daos/book-category-dao';

const bookCategoryDao = new BookCategoryDao();
const { BAD_REQUEST, CREATED, OK, INTERNAL_SERVER_ERROR } = StatusCodes;



/**
 * Get all categories.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const result = await bookCategoryDao.getAll();
        return res.status(OK).json(result);
    } catch (e) {
        return res.status(INTERNAL_SERVER_ERROR).json(e);
    }
}


/**
 * Add one category.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const addOneCategory = async (req: Request, res: Response) => {
    const category = req.body as IBookCategory;
    try {
        const result = await bookCategoryDao.add(category);
        return res.status(CREATED).json(result);
    } catch (e) {
        return res.status(BAD_REQUEST).json(e);
    }
    
}

/**
 * Update one category.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 export const updateOneCategory = async (req: Request, res: Response) => {
    const category = req.body as IBookCategory;
    try {
        const result = await bookCategoryDao.update(category);
        return res.status(CREATED).json(result);
    } catch (e) {
        return res.status(BAD_REQUEST).json(e);
    }
    
}

/**
 * delete one category.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 export const removeOneCategory = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await bookCategoryDao.remove(id);
        return res.status(CREATED).json(result);
    } catch (e) {
        return res.status(BAD_REQUEST).json(e);
    }
    
}
