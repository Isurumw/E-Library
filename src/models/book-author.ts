import { model, Schema, Document } from 'mongoose';

import { IBook } from '@models/book';

export interface IBookAuthor extends Document {
    name: string;
    books: string[] | IBook[]
};

const authorSchema = new Schema<IBookAuthor>({
    name: {
        type: String,
        required: [true, 'The author name cannot be empty.']
    },
    books: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Book'
        }
    ]
}, {
    timestamps: true
});

export default model<IBookAuthor>('BookAuthor', authorSchema);
