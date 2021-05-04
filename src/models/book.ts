import { model, Schema, Document } from 'mongoose';

import { IBookAuthor } from './book-author';
import { IBookCategory } from './book-category';

export interface IBook extends Document {
    name: string;
    indexNumber: string;
    category: string | IBookCategory;
    author: string | IBookAuthor;
    publisher?: string;
};

const bookSchema = new Schema<IBook>({
    name: {
        type: String,
        required: [true, 'The book name cannot be empty.']
    },
    indexNumber: {
        type: String,
        required: [true, 'The book index number cannot be empty.']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'BookCategory'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'BookAuthor'
    },
    publisher: String
}, {
    timestamps: true
});

bookSchema.index({name: 'text', indexNumber: 'text', publisher: 'text'});

export default model<IBook>('Book', bookSchema);
