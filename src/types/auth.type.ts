export interface AuthUser {
  email: string
  account: {
    username: string
  }
  token: string
  hash: string
  salt: string
}
