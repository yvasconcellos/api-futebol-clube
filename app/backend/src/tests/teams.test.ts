import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app'
// @ts-ignore
import chaiHttp = require('chai-http');
import TeamModel from '../database/models/TeamModel';

const teams = [
  { id: 1, teamName: 'Avaí/Kindermann' },
  { id: 2, teamName: 'Bahia' },
  { id: 3, teamName: 'Botafogo' },
  { id: 4, teamName: 'Corinthians' },
  { id: 5, teamName: 'Cruzeiro' },
  { id: 6, teamName: 'Ferroviária' },
  { id: 7, teamName: 'Flamengo' },
  { id: 8, teamName: 'Grêmio' },
  { id: 9, teamName: 'Internacional' },
  { id: 10, teamName: 'Minas Brasília' },
  { id: 11, teamName: 'Napoli-SC' },
  { id: 12, teamName: 'Palmeiras' },
  { id: 13, teamName: 'Real Brasília' },
  { id: 14, teamName: 'Santos' },
  { id: 15, teamName: 'São José-SP' },
  { id: 16, teamName: 'São Paulo' },
];


chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da Rota /Teams' ,() => {
  describe('Método Get', () => {
    afterEach(() => { sinon.restore() });

    it('Ao fazer uma requisição com sucesso na rota /teams, retorna status 200 e lista de todos os times', async () => {
      sinon.stub(TeamModel, 'findAll').resolves(teams as any)
      const httpResponse = await chai.request(app).get('/teams')
      expect(httpResponse.status).to.be.equal(200)
      expect(httpResponse.body).to.deep.equal(teams)
    })

    it('Ao fazer uma requisição com sucesso na rota /teams:id, retorna status 200 e lista de todos os times', async () => {
      sinon.stub(TeamModel, 'findByPk').resolves(teams[0] as any)

      const httpResponse = await chai.request(app).get('/teams/1')
      expect(httpResponse.status).to.be.equal(200)
      expect(httpResponse.body).to.deep.equal(teams[0])
    })
  })

})