import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';
import MatchModel from './MatchModel';

class TeamModel extends Model {
  id!: number;
  teamName!: string;
}

TeamModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING(100),
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

MatchModel.belongsTo(TeamModel, { foreignKey: 'homeTeam', as: 'teamHome' });
MatchModel.belongsTo(TeamModel, { foreignKey: 'awayTeam', as: 'teamAway' });

TeamModel.hasMany(MatchModel, { foreignKey: 'id', as: 'teamHome' });
TeamModel.hasMany(MatchModel, { foreignKey: 'id', as: 'teamAway' });

export default TeamModel;
