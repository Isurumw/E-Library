import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

export interface IUser extends Document {
    name: string;
    username: string;
    role: "admin" | "staff";
    password?: string;
    token?: string;
    isPasswordValid(password: string): boolean;
};

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, 'The name cannot be empty.']
    },
    username: {
        type: String,
        required: [true, 'The username cannot be empty.'],
        unique: [true, 'the username is already taken.']
    },
    role: {
        type: String,
        enum: ["admin", "staff"],
        required: [true, 'The user role cannot be empty.']
    },
    password: {
        type: String,
        required: [
            function(this: IUser) {
                return this.role === "staff";
            },
            'The password cannot be empty.'
        ]
    },
    token: String
}, {
    timestamps: true
});

userSchema.pre<IUser>('save', function(next: (err?: Error) => void) {
    let user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, (err: Error, salt: string) => {
        if (err) return next(err);

         // hash the password along with our new salt
         bcrypt.hash(user.password, salt, (err: Error, hash: string) => {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.isPasswordValid = function(password: string): boolean {
    return bcrypt.compareSync(password, this.password ?? "none");
};

export default model<IUser>('User', userSchema);
