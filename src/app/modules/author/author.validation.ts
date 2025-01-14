import { z } from 'zod'

const userNameSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string(),
  lastName: z.string(),
})

export const createAuthorValidationSchema = z.object({
  body: z.object({
    author: z.object({
      email: z.string().email(),
      password: z.string().min(8),
      name: userNameSchema,
      gender: z.enum(['male', 'female', 'others']),
      dateOfBirth: z.string().optional(),
      contactNo: z.string(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
})
