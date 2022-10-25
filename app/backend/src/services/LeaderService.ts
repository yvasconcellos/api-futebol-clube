import { iMatch, iTeam, leader } from '../utils/interfaces';
import MatchModel from '../database/models/MatchModel';
import TeamService from './TeamService';
import LeaderClass from '../utils/leaderClass';

export default class LeaderService {
  private _matchModel = MatchModel;
  private _teamService = new TeamService();

  async getLeaderBoard() {
    const teams = await this._teamService.getAllTeams();
    const dataTeams = await this.getDataFromTeams(teams);
    return dataTeams;
  }

  async getLeaderBoardHome() {
    const teams = await this._teamService.getAllTeams();
    const dataTeams = await this.getDataFromTeamsHome(teams);
    return dataTeams;
  }

  async getLeaderBoardAway() {
    const teams = await this._teamService.getAllTeams();
    const dataTeams = await this.getDataFromTeamsAway(teams);
    return dataTeams;
  }

  getDataFromTeams = async (teams: iTeam[]): Promise<leader[]> => {
    const arrayLeader: leader[] = [];
    const response = teams.map(async (team: iTeam) => {
      const matchsByTeamHome = await this.getHomeMatches(team.id);
      const matchsByTeamAway = await this.getAwayMatches(team.id);
      const leaderData = await this.leaderTeams(team, matchsByTeamHome, matchsByTeamAway);
      arrayLeader.push(leaderData);
    });
    await Promise.all(response);
    return arrayLeader;
  };

  getDataFromTeamsHome = async (teams: iTeam[]): Promise<leader[]> => {
    const arrayLeader: leader[] = [];
    const response = teams.map(async (team: iTeam) => {
      const matchsByTeamHome = await this.getHomeMatches(team.id);
      const leaderData = await this.leaderTeamsHome(team, matchsByTeamHome);
      arrayLeader.push(leaderData);
    });
    await Promise.all(response);
    return arrayLeader;
  };

  getDataFromTeamsAway = async (teams: iTeam[]): Promise<leader[]> => {
    const arrayLeader: leader[] = [];
    const response = teams.map(async (team: iTeam) => {
      const matchsByTeamAway = await this.getAwayMatches(team.id);
      const leaderData = await this.leaderTeamsAway(team, matchsByTeamAway);
      arrayLeader.push(leaderData);
    });
    await Promise.all(response);
    return arrayLeader;
  };

  leaderTeams = async (team: iTeam, teamHome: iMatch[], teamAway: iMatch[]): Promise<leader> => {
    const _leaderClass = new LeaderClass();

    _leaderClass.setDataLeaderHome(teamHome);
    _leaderClass.setDataLeaderAway(teamAway);
    _leaderClass.setEfficiency(teamHome.length + teamAway.length);

    const result = {
      name: team.teamName,
      totalPoints: (_leaderClass._victory * 3) + _leaderClass._draw,
      totalGames: teamHome.length + teamAway.length,
      totalVictories: _leaderClass._victory,
      totalDraws: _leaderClass._draw,
      totalLosses: _leaderClass._loss,
      goalsFavor: _leaderClass._goalsFavor,
      goalsOwn: _leaderClass._goalsOwn,
      goalsBalance: _leaderClass._goalsFavor - _leaderClass._goalsOwn,
      efficiency: _leaderClass._efficiency,
    };
    return result;
  };

  leaderTeamsHome = async (team: iTeam, teamHome: iMatch[]): Promise<leader> => {
    const _leaderClass = new LeaderClass();

    _leaderClass.setDataLeaderHome(teamHome);
    _leaderClass.setEfficiency(teamHome.length);

    const result = {
      name: team.teamName,
      totalPoints: (_leaderClass._victory * 3) + _leaderClass._draw,
      totalGames: teamHome.length,
      totalVictories: _leaderClass._victory,
      totalDraws: _leaderClass._draw,
      totalLosses: _leaderClass._loss,
      goalsFavor: _leaderClass._goalsFavor,
      goalsOwn: _leaderClass._goalsOwn,
      goalsBalance: _leaderClass._goalsFavor - _leaderClass._goalsOwn,
      efficiency: _leaderClass._efficiency,
    };
    return result;
  };

  leaderTeamsAway = async (team: iTeam, teamAway: iMatch[]): Promise<leader> => {
    const _leaderClass = new LeaderClass();

    _leaderClass.setDataLeaderAway(teamAway);
    _leaderClass.setEfficiency(teamAway.length);

    const result = {
      name: team.teamName,
      totalPoints: (_leaderClass._victory * 3) + _leaderClass._draw,
      totalGames: teamAway.length,
      totalVictories: _leaderClass._victory,
      totalDraws: _leaderClass._draw,
      totalLosses: _leaderClass._loss,
      goalsFavor: _leaderClass._goalsFavor,
      goalsOwn: _leaderClass._goalsOwn,
      goalsBalance: _leaderClass._goalsFavor - _leaderClass._goalsOwn,
      efficiency: _leaderClass._efficiency,
    };
    return result;
  };

  async getHomeMatches(id: number) {
    const matchsByTeamHome = await this._matchModel.findAll({
      where: { homeTeam: id,
        inProgress: 0 },
    }) as unknown as iMatch[];
    return matchsByTeamHome;
  }

  async getAwayMatches(id: number) {
    const matchsByTeamAway = await this._matchModel.findAll({
      where: { awayTeam: id,
        inProgress: 0 },
    }) as unknown as iMatch[];
    return matchsByTeamAway;
  }
}
