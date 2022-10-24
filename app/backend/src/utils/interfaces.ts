export interface iLogin {
  email: string,
  password: string
}

export interface iLoginService {
  validateUser(user: iLogin): Promise<boolean>
}
