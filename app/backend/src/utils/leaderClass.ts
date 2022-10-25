import { iMatch } from './interfaces';

export default class LeaderClass {
  _victory = 0;
  _draw = 0;
  _loss = 0;
  _goalsFavor = 0;
  _goalsOwn = 0;
  _efficiency = 0;

  setDataLeaderHome(teamMatchs: iMatch[]) {
    teamMatchs.forEach((match) => {
      this._goalsFavor += match.homeTeamGoals;
      this._goalsOwn += match.awayTeamGoals;
      if (match.homeTeamGoals > match.awayTeamGoals) {
        this._victory += 1;
      }

      if (match.homeTeamGoals === match.awayTeamGoals) {
        this._draw += 1;
      }

      if (match.homeTeamGoals < match.awayTeamGoals) {
        this._loss += 1;
      }
    });
  }

  setDataLeaderAway(teamMatchs: iMatch[]) {
    teamMatchs.forEach((match) => {
      this._goalsFavor += match.awayTeamGoals;
      this._goalsOwn += match.homeTeamGoals;
      if (match.awayTeamGoals > match.homeTeamGoals) {
        this._victory += 1;
      }

      if (match.awayTeamGoals === match.homeTeamGoals) {
        this._draw += 1;
      }

      if (match.awayTeamGoals < match.homeTeamGoals) {
        this._loss += 1;
      }
    });
  }

  setEfficiency(quantity: number): void {
    const calculeEfficiency = (((this._victory * 3) + this._draw)
    / (quantity * 3)) * 100;
    this._efficiency = Math.round(calculeEfficiency * 100) / 100;
  }
}
