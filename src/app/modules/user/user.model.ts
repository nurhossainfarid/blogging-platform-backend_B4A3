import { model, Schema } from 'mongoose'
import { TUser, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new Schema<TUser, UserModel>(
  {
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'author'],
        message: "Role must be one of 'author', or 'admin'",
      },
      required: [true, 'User role is required'],
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
  { timestamps: true },
)

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

// instance method for checking if the user is exist
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

export const User = model<TUser, UserModel>('User', userSchema)
