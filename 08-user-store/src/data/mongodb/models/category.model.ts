import { model, Schema } from "mongoose";


const categorySchema = new Schema({

  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true
  },

  available: {
    type: Boolean,
    default: false,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

});

categorySchema.set('toJSON', {  virtuals: true,  transform: (doc, { _id, __v, ...rest }) => ({ ...rest })});

export const CategoryModel = model('Category', categorySchema);