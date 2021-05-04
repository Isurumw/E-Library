import { model, Schema, Document } from 'mongoose';

export interface IBookCategory extends Document {
    name: string;
};

const categorySchema = new Schema<IBookCategory>({
    name: {
        type: String,
        required: [true, 'The category name cannot be empty.']
    }
}, {
    timestamps: true
});

export default model<IBookCategory>('BookCategory', categorySchema);
