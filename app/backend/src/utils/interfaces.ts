export interface iLogin {
  email: string,
  password: string
  role?: string
}

export interface iLoginService {
  validateUser(user: iLogin): Promise<iLogin[]>
}

export interface iTeam {
  id: number,
  teamName: string
}

export interface iTeamService {
  getAllTeams(): Promise<iTeam[]>
  getTeamById(teamId: string): Promise<iTeam>
}
