import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app'
// @ts-ignore
import chaiHttp = require('chai-http');
import TeamModel from '../database/models/TeamModel';
import { teams, leaderboard, leaderHome, leaderAway } from './utils/allTeams'
import MatchModel from '../database/models/MatchModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste rota Leaderboard', () => {
  describe('Método Get', () => {
    afterEach(() => { sinon.restore() });
    it('Se correto, retorna Status 200 e Classificação', async() => {
      sinon.stub(TeamModel, 'findAll').resolves(teams as any)

      const httpResponse = await chai.request(app).get('/leaderboard')

      expect(httpResponse.status).to.equal(200)
      expect(httpResponse.body).to.deep.equal(leaderboard as any)
    })

    it('Se correto, a rota leaderboard/home retorna Status 200 e Classificação', async() => {
      sinon.stub(TeamModel, 'findAll').resolves(teams as any)

      const httpResponse = await chai.request(app).get('/leaderboard/home')

      expect(httpResponse.status).to.equal(200)
      expect(httpResponse.body).to.deep.equal(leaderHome as any)
    })

    it('Se correto, a rota /leaderboard/away retorna Status 200 e Classificação', async() => {
      sinon.stub(TeamModel, 'findAll').resolves(teams as any)

      const httpResponse = await chai.request(app).get('/leaderboard/away')

      expect(httpResponse.status).to.equal(200)
      expect(httpResponse.body).to.deep.equal(leaderAway as any)
    })
    
  });
})
