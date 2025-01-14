import { model, Schema } from 'mongoose'
import { TAuthor, TAuthorName } from './author.interface'

// student name Schema
const nameSchema = new Schema<TAuthorName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First Name is required'],
    maxLength: [20, 'First name less than 20 characters'],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
  },
})

const authorSchema = new Schema<TAuthor>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User Id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: nameSchema,
      required: [true, 'Name is required'],
      trim: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'others'],
        message: '{VALUE} is not valid',
      },
      required: [true, 'gender is required'],
    },
    dateOfBirth: {
      type: String,
    },
    contactNo: {
      type: String,
      required: true,
      trim: true,
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not valid',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    profileImg: {
      type: String,
    },
    Blogs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// authorSchema.virtual('fullName').get(function() {
//   return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`
// })

authorSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

authorSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

// Create the model
export const Author = model<TAuthor>('Author', authorSchema)
