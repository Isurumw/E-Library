import { Router } from 'express';

import { signup, signin, isLocalAuthenticated } from './auth';
import { getAllUsers, addOneUser, updateOneUser } from './users';
import { getAllBooks, searchBooks, addOneBook, updateOneBook, removeOneUBook } from './book';
import { getAllCategories, addOneCategory, updateOneCategory, removeOneCategory } from './book-category';
import { getAllAuthors, addOneAuthor, updateOneAuthor, removeOneUser } from './book-author';

// Auth-route
const authRouter = Router();
authRouter.post('/signin', signin);
authRouter.post('/signup', signup);

// User-route
const userRouter = Router();
userRouter.route('/')
        .get(isLocalAuthenticated, getAllUsers)
        .post(isLocalAuthenticated, addOneUser)
        .put(isLocalAuthenticated, updateOneUser);

// Book-route
const bookRouter = Router();
bookRouter.route('/')
    .get(isLocalAuthenticated, getAllBooks)
    .post(isLocalAuthenticated, addOneBook)
    .put(isLocalAuthenticated, updateOneBook);
bookRouter.post('/search', isLocalAuthenticated, searchBooks);
bookRouter.delete('/:id', isLocalAuthenticated, removeOneUBook);

// Book-category-route
const bookCategoryRouter = Router();
bookCategoryRouter.route('/')
    .get(isLocalAuthenticated, getAllCategories)
    .post(isLocalAuthenticated, addOneCategory)
    .put(isLocalAuthenticated, updateOneCategory);
bookCategoryRouter.delete('/:id', isLocalAuthenticated, removeOneCategory);

// Book-author-route
const bookAuthorRouter = Router();
bookAuthorRouter.route('/')
    .get(isLocalAuthenticated, getAllAuthors)
    .post(isLocalAuthenticated, addOneAuthor)
    .put(isLocalAuthenticated, updateOneAuthor);
bookAuthorRouter.delete('/:id', isLocalAuthenticated, removeOneUser);


// Export the base-router
const baseRouter = Router();

baseRouter.use('/auth', authRouter);

baseRouter.use('/users', userRouter);

baseRouter.use('/books', bookRouter);
bookRouter.use('/categories', bookCategoryRouter);
bookRouter.use('/authors', bookAuthorRouter);

export default baseRouter;
