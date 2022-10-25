import TeamModel from '../database/models/TeamModel';
import TeamService from './TeamService';
import MatchModel from '../database/models/MatchModel';
import { createMatch, iMatch, iMatchService } from '../utils/interfaces';

export default class MatchService implements iMatchService {
  private _matchModel = MatchModel;
  private _teamService = new TeamService();

  async getAllMatches(): Promise<iMatch[]> {
    const result = await this._matchModel.findAll({
      include: [{ model: TeamModel,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      }, { model: TeamModel,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
    });
    return result as unknown as iMatch[];
  }

  async getAllMatchesFiltered(filter: string): Promise<iMatch[]> {
    let progress;
    if (filter === 'true') {
      progress = 1;
    } else { progress = 0; }
    const result = await this._matchModel.findAll({
      include: [{ model: TeamModel,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      }, { model: TeamModel,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
      where: {
        inProgress: progress,
      },
    });
    return result as unknown as iMatch[];
  }

  async createMatches({ homeTeam, homeTeamGoals, awayTeam, awayTeamGoals }: createMatch):
  Promise<createMatch | null> {
    const home = await this._teamService.getTeamById(homeTeam as unknown as string);
    const away = await this._teamService.getTeamById(awayTeam as unknown as string);

    if (home && away) {
      const result = await this._matchModel.create({
        homeTeam,
        homeTeamGoals,
        awayTeam,
        awayTeamGoals,
        inProgress: 1,
      });

      return result;
    }
    return null;
  }

  async finalizeMatch(id: string): Promise<void> {
    await this._matchModel.update(
      {
        inProgress: 0,
      },
      { where: { id } },
    );
  }

  async updateMatch(id: string, homeGoals: string, awayGoals: string): Promise<void> {
    await this._matchModel.update(
      {
        homeTeamGoals: homeGoals,
        awayTeamGoals: awayGoals,
      },
      { where: { id } },
    );
  }
}
