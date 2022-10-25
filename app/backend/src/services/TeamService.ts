import TeamModel from '../database/models/TeamModel';
import { iTeam, iTeamService } from '../utils/interfaces';

export default class TeamService implements iTeamService {
  getTeamById = async (teamId: string): Promise<iTeam> => {
    const team = await TeamModel.findByPk(teamId);
    return team as iTeam;
  };

  getAllTeams = async (): Promise<iTeam[]> => {
    const teams = await TeamModel.findAll();

    return teams;
  };
}
