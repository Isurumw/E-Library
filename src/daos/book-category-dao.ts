import BookCategorySchema, { IBookCategory } from '@models/book-category';
import { ApiResponse } from "@shared/types";

class BookCategoryDao {

     /**
     *
     */
      public async getAll(): Promise<ApiResponse<IBookCategory[]>> {
        try {
            const books = await BookCategorySchema.find();
            return Promise.resolve({
                data: books,
                status: {
                    isSuccess: true,
                    message: 'All categories retrieved successfully.'
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
     * @param book_category
     */
    public async add(category: IBookCategory): Promise<ApiResponse<IBookCategory>> {
        const newCategory = new BookCategorySchema(category);

        try {
            const savedCategory = await newCategory.save();
            return Promise.resolve({
                data: savedCategory,
                status: {
                    isSuccess: true,
                    message: `${savedCategory.name} has been saved successfully.`
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
     * @param book_category
     */
     public async update(category: IBookCategory): Promise<ApiResponse<IBookCategory>> {
        try {
            const updatedCategory = await BookCategorySchema.findOneAndUpdate({_id: category._id}, {$set: category}, {new: true});
            return Promise.resolve({
                data: updatedCategory!,
                status: {
                    isSuccess: true,
                    message: `${updatedCategory!.name} has been updated successfully.`
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
     public async remove(id: string): Promise<ApiResponse<IBookCategory>> {
        try {
            await BookCategorySchema.remove({_id: id});
            return Promise.resolve({
                status: {
                    isSuccess: true,
                    message: 'The book category has been removed successfully.'
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

export default BookCategoryDao;
