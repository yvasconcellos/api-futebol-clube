export interface iLogin {
  email: string,
  password: string
  role?: string
}

export interface iLoginService {
  validateUser(user: iLogin): Promise<iLogin[]>
}
