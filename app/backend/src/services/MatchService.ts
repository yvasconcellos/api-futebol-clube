import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import { iMatch, iMatchService } from '../utils/interfaces';

export default class MatchService implements iMatchService {
  private _matchModel = MatchModel;

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
}
