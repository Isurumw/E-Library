import UserSchema, { IUser } from '@models/user';
import { ApiResponse } from "@shared/types";

class UserDao {

    /**
     *
     */
    public async getAll(): Promise<ApiResponse<IUser[]>> {
        try {
            const users = await UserSchema.find();
            return Promise.resolve({
                data: users,
                status: {
                    isSuccess: true,
                    message: 'All users retrieved successfully.'
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
     * @param user
     */
    public async add(user: IUser): Promise<ApiResponse<IUser>> {
        const newUser = new UserSchema(user);

        try {
            const result = await newUser.save();
            return Promise.resolve({
                data: result,
                status: {
                    isSuccess: true,
                    message: `${result.name} has been saved successfully.`
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
     * @param user
     */
     public async update(user: IUser): Promise<ApiResponse<IUser>> {
        try {
            const result = await UserSchema.findOneAndUpdate({_id: user._id}, {$set: user}, {new: true});
            return Promise.resolve({
                data: result!,
                status: {
                    isSuccess: true,
                    message: `${result!.name} has been updated successfully.`
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

export default UserDao;
