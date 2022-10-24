import MatchService from '../services/MatchService';
import { iMatchService } from '../utils/interfaces';

export default class matchController {
  constructor(private _matchService: iMatchService = new MatchService()) {
  }

  getAllMatches = async () => {
    const result = await this._matchService.getAllMatches();
    return result;
  };

  getAllMatchesFiltered = async (filter: string) => {
    const result = await this._matchService.getAllMatchesFiltered(filter);
    return result;
  };
}
