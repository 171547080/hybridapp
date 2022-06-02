export type RoleType = '' | '*' | 'admin' | 'user'
export interface UserState {
  id?: string
  userId?: string
  loginName?: string
  password?: string
  gender?: string
  email?: string
  mobile?: string
  department?: string
  departmentId?: string
  role?: RoleType,
  realName?: string,
  disabled?: boolean,
  accessKey?: string,
  secretKey?: string,
  superAdmin?: boolean,
  tokenId?: string,
}
