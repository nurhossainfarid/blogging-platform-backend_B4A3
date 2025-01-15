import { model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import config from '../../config'
import { TUser, UserModel } from './user.interface'


const userSchema = new Schema<TUser, UserModel>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: 0,
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: '{VALUE} is not valid',
      },
      default: 'user',
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },

    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'others'],
        message: '{VALUE} is not valid',
      },
    },
    dateOfBirth: {
      type: String,
    },
    contactNo: {
      type: String,
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
    },
    permanentAddress: {
      type: String,
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
    needsPasswordChange: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// pre save middleware/hook document middleware
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  // Hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )

  next()
})

userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

userSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

userSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

// method for checking if the user is exist
userSchema.statics.isUserExistsById = async function (id: string) {
  return await User.findById({ id }).select('+password')
}

// method for checking is the user is exist by email
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password')
}
userSchema.statics.isUserExistsById = async function (id: string) {
  return await User.findOne({ id }).select('+password')
}

// instance method for checking if password are matched
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword)
}

// Create the model
export const User = model<TUser, UserModel>('User', userSchema)
