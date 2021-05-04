import BookSchema, { IBook } from '@models/book';
import AuthorSchema from '@models/book-author';
import { ApiResponse } from "@shared/types";

export type BookSearch = {
    key?: string;
    author?: string;
    category?: string;
};

class BookDao {

     /**
     *
     */
      public async getAll(): Promise<ApiResponse<IBook[]>> {
        try {
            const books = await BookSchema.find()
                            .populate({ path: 'category', select: ['name', '_id'] })
                            .populate({ path: 'author', select: ['name', '_id'] });
            return Promise.resolve({
                data: books,
                status: {
                    isSuccess: true,
                    message: 'All books retrieved successfully.'
                }
            });
        } catch (e) {
            return Promise.reject({
                status: {
                    isSuccess: false
                },
                error: {
                    message: e.message
                }
            });
        }
    }

    /**
     *
     * @param key
     */
     public async search(params?: BookSearch): Promise<ApiResponse<IBook[]>> {
        let query: {} = {};

        if (params?.key) {
            query = {
                $or: [
                    {name:  { $regex: params.key, $options: "i" }},
                    {indexNumber:  { $regex: params.key, $options: "i" }}
                ]
            };
        }

        if (params?.author) {
            query = {
                ...query,
                ...{ author: params.author }
            }
        }

        if (params?.category) {
            query = {
                ...query,
                ...{ category: params.category }
            }
        }

        try {
            const books = await BookSchema.find(query)
                            .populate({ path: 'category', select: ['name', '_id'] })
                            .populate({ path: 'author', select: ['name', '_id'] });
            return Promise.resolve({
                data: books,
                status: {
                    isSuccess: true,
                    message: 'All books retrieved successfully.'
                }
            });
        } catch (e) {
            return Promise.reject({
                status: {
                    isSuccess: false
                },
                error: {
                    message: e.message
                }
            });
        }
    }


    /**
     *
     * @param book
     */
    public async add(book: IBook): Promise<ApiResponse<IBook>> {
        const newBook = new BookSchema(book);

        try {
            const savedBook = await newBook.save();

            // Add book reference on author
            const author = await AuthorSchema.findById(book.author as string);
            if (!author?.books.includes(savedBook._id)) {
                author?.books.push(savedBook._id);
                author?.save();
            }

            return Promise.resolve({
                data: savedBook,
                status: {
                    isSuccess: true,
                    message: `${savedBook.name} has been saved successfully.`
                }
            });
        } catch (e) {
            return Promise.reject({
                status: {
                    isSuccess: false
                },
                error: {
                    message: e.message
                }
            });
        }
    }

    /**
     *
     * @param book
     */
     public async update(book: IBook): Promise<ApiResponse<IBook>> {
        try {
            const updatedBook = await BookSchema.findOneAndUpdate({_id: book._id}, {$set: book}, {new: true});

            // Add book reference on author
            const author = await AuthorSchema.findById(book.author as string);
            if (!author?.books.includes(updatedBook?._id)) {
                author?.books.push(updatedBook?._id);
                author?.save();
            }

            return Promise.resolve({
                data: updatedBook!,
                status: {
                    isSuccess: true,
                    message: `${updatedBook!.name} has been updated successfully.`
                }
            });
        } catch (e) {
            return Promise.reject({
                status: {
                    isSuccess: false
                },
                error: {
                    message: e.message
                }
            });
        }
    }

    /**
     *
     * @param _id
     */
     public async remove(id: string): Promise<ApiResponse<IBook>> {
        try {
            await BookSchema.remove({_id: id});
            return Promise.resolve({
                status: {
                    isSuccess: true,
                    message: 'The book has been removed successfully.'
                }
            });
        } catch (e) {
            return Promise.reject({
                status: {
                    isSuccess: false
                },
                error: {
                    message: e.message
                }
            });
        }
    }

}

export default BookDao;
