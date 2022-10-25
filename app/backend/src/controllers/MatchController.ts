import MatchService from '../services/MatchService';
import { createMatch, iMatchService } from '../utils/interfaces';

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

  createMatch = async (data: createMatch) => {
    const result = await this._matchService.createMatches(data);
    return result;
  };

  finalizeMatch = async (id: string) => {
    await this._matchService.finalizeMatch(id);
  };

  updateMatch = async (id: string, homeGoals: string, awayGoals: string) => {
    await this._matchService.updateMatch(id, homeGoals, awayGoals);
  };
}
