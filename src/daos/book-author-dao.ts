import BookAuthorSchema, { IBookAuthor } from '@models/book-author';
import { ApiResponse } from "@shared/types";

class BookAuthorDao {

     /**
     *
     */
      public async getAll(): Promise<ApiResponse<IBookAuthor[]>> {
        try {
            const authors = await BookAuthorSchema.find()
                                .populate({ path: 'books', select: ['_id', 'name', 'indexNumber', 'publisher'] });
            return Promise.resolve({
                data: authors,
                status: {
                    isSuccess: true,
                    message: 'All authors retrieved successfully.'
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
     * @param book_author
     */
    public async add(author: IBookAuthor): Promise<ApiResponse<IBookAuthor>> {
        const newAuthor = new BookAuthorSchema(author);

        try {
            const savedAuthor = await newAuthor.save();
            return Promise.resolve({
                data: savedAuthor,
                status: {
                    isSuccess: true,
                    message: `${savedAuthor.name} has been saved successfully.`
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
     * @param book_author
     */
     public async update(author: IBookAuthor): Promise<ApiResponse<IBookAuthor>> {
        try {
            const updatedAuthor = await BookAuthorSchema.findOneAndUpdate({_id: author._id}, {$set: author}, {new: true});
            return Promise.resolve({
                data: updatedAuthor!,
                status: {
                    isSuccess: true,
                    message: `${updatedAuthor!.name} has been updated successfully.`
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
     public async remove(id: string): Promise<ApiResponse<IBookAuthor>> {
        try {
            await BookAuthorSchema.remove({_id: id});
            return Promise.resolve({
                status: {
                    isSuccess: true,
                    message: 'The book author has been removed successfully.'
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

export default BookAuthorDao;
