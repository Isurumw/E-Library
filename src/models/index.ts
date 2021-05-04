import BookSchema, { IBook } from "./book";
import BookAuthorSchema, { IBookAuthor } from "./book-author";
import BookCategorySchema, { IBookCategory } from "./book-category";
import UserSchema, { IUser } from "./user";

export { 
    BookSchema,
    BookAuthorSchema,
    BookCategorySchema,
    UserSchema
};

export type {
    IBook,
    IBookAuthor,
    IBookCategory,
    IUser
}
