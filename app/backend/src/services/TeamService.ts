import TeamModel from '../database/models/TeamModel';
import { iTeam, iTeamService } from '../utils/interfaces';

export default class TeamService implements iTeamService {
  private _teamModel = TeamModel;

  async getTeamById(teamId: string): Promise<iTeam> {
    const team = await this._teamModel.findByPk(teamId);
    return team as iTeam;
  }

  async getAllTeams(): Promise<iTeam[]> {
    const teams = await this._teamModel.findAll();
    return teams;
  }
}
