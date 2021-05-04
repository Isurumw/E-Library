import jwt from 'jsonwebtoken';
import { secretKey, signinError } from '@shared/constants';
import UserSchema, { IUser } from '@models/user';
import { ApiResponse } from "@shared/types";

class AuthDao {

    /**
     *
     * @param user
     */
    private async generateToken(user: IUser): Promise<IUser> {
        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, secretKey);

        user.token = token;

        return await user.save();
    }

    /**
     *
     * @param user
     */
     public async authenticate(user: IUser): Promise<ApiResponse<IUser>> {
         try {
            const localUser = await UserSchema.findOne({username: user.username, role: user.role});

            const isMatch = user.role === "admin" ? true : localUser!.isPasswordValid(user.password!);

            if (!isMatch) {
                return Promise.reject({
                    status: {
                        isSuccess: false
                    },
                    error: {
                        message: signinError
                    }
                });
            }

            const updatedLocalUser = await this.generateToken(localUser!);
            return Promise.resolve({
                data: updatedLocalUser!,
                status: {
                    isSuccess: true,
                    message: "User authenticated successfully."
                }
            });
        } catch (e) {
            return Promise.reject({
                status: {
                    isSuccess: false
                },
                error: {
                    message: signinError
                }
            });
        }

     }

     /**
     *
     * @param user
     */
      public async register(user: IUser): Promise<ApiResponse<IUser>> {
        const newUser = new UserSchema(user);
        try {
            const localUser = await newUser.save();
            const updatedLocalUser = await this.generateToken(localUser!);

            return Promise.resolve({
                data: updatedLocalUser!,
                status: {
                    isSuccess: true,
                    message: "User registered successfully."
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

export default AuthDao;
