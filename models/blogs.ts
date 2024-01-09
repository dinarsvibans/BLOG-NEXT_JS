import mongoose from 'mongoose';
import { Schema, model, models } from 'mongoose';


const blogsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  category: {
    type: [String],
    default: [],
  },
});

const Blog = models.Blog || mongoose.model('Blog', blogsSchema);
export default Blog;
