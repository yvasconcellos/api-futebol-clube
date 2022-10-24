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

export interface iMatch {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: number,
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
}

export interface iMatchService {
  getAllMatches(): Promise<iMatch[]>
  getAllMatchesFiltered(filter: string): Promise<iMatch[]>
}
