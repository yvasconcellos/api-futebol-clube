import { leader } from '../utils/interfaces';
import LeaderService from '../services/LeaderService';

export default class LeaderController {
  constructor(private _leaderService = new LeaderService()) {
  }

  compare = (arraySort: leader[]) => {
    arraySort.sort((time1, time2) => {
      if (time1.totalPoints < time2.totalPoints) return 1;
      if (time1.totalPoints > time2.totalPoints) return -1;
      if (time1.totalVictories < time2.totalVictories) return 1;
      if (time1.totalVictories > time2.totalVictories) return -1;
      if (time1.goalsBalance < time2.goalsBalance) return 1;
      if (time1.goalsBalance > time2.goalsBalance) return -1;
      if (time1.goalsFavor < time2.goalsFavor) return 1;
      if (time1.goalsFavor > time2.goalsFavor) return -1;
      if (time1.goalsOwn < time2.goalsOwn) return -1;
      if (time1.goalsOwn > time2.goalsOwn) return 1;
      return 0;
    });
  };

  getLeaderBoard = async () => {
    const result = await this._leaderService.getLeaderBoard();
    this.compare(result);
    return result;
  };

  getLeaderBoardHome = async () => {
    const result = await this._leaderService.getLeaderBoardHome();
    this.compare(result);
    return result;
  };

  getLeaderBoardAway = async () => {
    const result = await this._leaderService.getLeaderBoardAway();
    this.compare(result);
    return result;
  };
}
