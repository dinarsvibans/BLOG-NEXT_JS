import mongoose from 'mongoose';
import { Schema, model, models } from 'mongoose';


const commentSchema = new Schema({
    text: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    blog: { type: Schema.Types.ObjectId, ref: 'Blog' }, // Reference to the Blog model
  });

const Comment = models.Comment || mongoose.model('Comment', commentSchema);
export default Comment;
