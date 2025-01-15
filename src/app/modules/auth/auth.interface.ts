import { TName } from '../../interface/globalInterface'

export type TLoginUser = {
  email: string
  password: string
}

export type TRegisterUser = {
  name: TName
  email: string
  password: string
}
