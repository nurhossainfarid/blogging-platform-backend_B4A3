import { model, Schema } from 'mongoose'
import { TBlog } from './blog.interface'

// Blog Post Schema
const BlogPostSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Author',
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, 
  },
);



// Blog Post Model
export const Blog = model<TBlog>('Blog', BlogPostSchema)

 
