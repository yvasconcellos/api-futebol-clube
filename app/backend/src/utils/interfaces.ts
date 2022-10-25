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
  createMatches(data: createMatch): Promise<createMatch | null>
  finalizeMatch(id: string): Promise<void>
  updateMatch(id: string, homeGoals: string, awayGoals: string): Promise<void>

}

export interface createMatch {
  id?: number
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress?: boolean
}

export interface leader {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number
}

export interface iLeaderService {
  getDataFromTeams(teams: iTeam[]): Promise<leader[]>
}
