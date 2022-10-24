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

MatchModel.belongsTo(TeamModel, { foreignKey: 'homeTeam', as: 'home' });
MatchModel.belongsTo(TeamModel, { foreignKey: 'awayTeam', as: 'away' });

TeamModel.hasMany(MatchModel, { foreignKey: 'id', as: 'home' });
TeamModel.hasMany(MatchModel, { foreignKey: 'id', as: 'away' });

export default TeamModel;
