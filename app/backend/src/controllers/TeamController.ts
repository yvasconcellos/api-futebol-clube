import TeamService from '../services/TeamService';
import { iTeamService } from '../utils/interfaces';

export default class TeamController {
  constructor(private _teamService: iTeamService = new TeamService()) {
  }

  getAllTeams = async () => {
    const result = await this._teamService.getAllTeams();
    return result;
  };

  getTeamById = async (teamId: string) => {
    const result = await this._teamService.getTeamById(teamId);
    return result;
  };
}
