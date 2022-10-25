import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app'
// @ts-ignore
import chaiHttp = require('chai-http');
import {matches, matchesInProgress, matchesFinished, matchCreated} from './utils/allmatches';
import MatchModel from '../database/models/MatchModel';
import { Match } from '@testing-library/react';
import { iMatch } from '../utils/interfaces';
import TeamModel from '../database/models/TeamModel';

chai.use(chaiHttp);

const { expect } = chai;
const tokenValido = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjY2NjI2ODM5fQ.Lm1hEYvaZ00GsWu-oy3n4Q38gFgI74RBQ2ufyK1EsKQ"


describe('Teste da Rota /Matches' ,() => {
  describe('Método Get', () => {
    afterEach(() => { sinon.restore() });
    it('Ao fazer uma requisição com sucesso na rota /matches, retorna status 200 e lista de todos as partidas', async () => {
      sinon.stub(MatchModel, 'findAll').resolves(matches as any)
      
      const httpResponse = await chai.request(app).get('/matches')
      expect(httpResponse.status).to.be.equal(200)
      expect(httpResponse.body).to.deep.equal(matches)
    })

    it('Ao fazer uma requisição com sucesso na rota /matches?inProgress=true, retorna status 200 e lista de todos as partidas em progresso', async () => {
      sinon.stub(MatchModel, 'findAll').resolves(matchesInProgress as any)
      
      const httpResponse = await chai.request(app).get('/matches?inProgress=true')
      expect(httpResponse.status).to.be.equal(200)
      expect(httpResponse.body).to.deep.equal(matchesInProgress)
    })

    it('Ao fazer uma requisição com sucesso na rota /matches?inProgress=false, retorna status 200 e lista de todos as partidas finalizadas', async () => {
      sinon.stub(MatchModel, 'findAll').resolves(matchesFinished as any)
      
      const httpResponse = await chai.request(app).get('/matches?inProgress=false')
      expect(httpResponse.status).to.be.equal(200)
      expect(httpResponse.body).to.deep.equal(matchesFinished)
    })
  })

  describe('Método POST', () => {
    afterEach(() => { sinon.restore() });
    it('Ao criar um Match com sucesso, retorna status 201 e retorna os dados da partida', async () => {
      sinon.stub(MatchModel, 'create').resolves(matchCreated as any)
      
      const httpResponse = await chai.request(app).post('/matches').set('Authorization', tokenValido).send(
        {
          homeTeam: 16,
          awayTeam: 8,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
        }
      )
      expect(httpResponse.status).to.be.equal(201)
      expect(httpResponse.body).to.deep.equal(matchCreated)
    })

    it('Ao tentar criar um Match com dois times iguais, retorna status 422 e mensagem de erro', async () => {
      const httpResponse = await chai.request(app).post('/matches').set('Authorization', tokenValido).send(
        {
          homeTeam: 16,
          awayTeam: 16,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
        }
      )
      expect(httpResponse.status).to.be.equal(422)
      expect(httpResponse.body).to.deep.equal({ message: "It is not possible to create a match with two equal teams" })
    })

    it('Ao tentar criar um Match com times que não existem, retorna status 404 e mensagem de erro', async () => {
      sinon.stub(TeamModel, 'findByPk').resolves(null as any)
      
      const httpResponse = await chai.request(app).post('/matches').set('Authorization', tokenValido).send(
        {
          homeTeam: 99999,
          awayTeam: 16,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
        }
      )
      expect(httpResponse.status).to.be.equal(404)
      expect(httpResponse.body).to.deep.equal({ message: "There is no team with such id!" })
    })

    it('Ao tentar criar um Match com token inválido, retorna status 401 e mensagem de erro', async () => {
      
      const httpResponse = await chai.request(app).post('/matches').set('Authorization', 'token_invalido').send(
        {
          homeTeam: 99999,
          awayTeam: 16,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
        }
      )
      expect(httpResponse.status).to.be.equal(401)
      expect(httpResponse.body).to.deep.equal({ message: "Token must be a valid token" })
    })

    it('Ao tentar criar um Match sem token, retorna status 401 e mensagem de erro', async () => {
      
      const httpResponse = await chai.request(app).post('/matches').send(
        {
          homeTeam: 99999,
          awayTeam: 16,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
        }
      )
      expect(httpResponse.status).to.be.equal(401)
      expect(httpResponse.body).to.deep.equal({ message: "Token not found" })
    })

    it('Ao tentar criar um Match sem algum dos campos preenchidos, retorna status 400 e mensagem de erro', async () => {
      
      const httpResponse = await chai.request(app).post('/matches').set('Authorization', tokenValido).send(
        {
          awayTeam: 16,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
        }
      )
      expect(httpResponse.status).to.be.equal(400)
      expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
    })
  })

  describe('Método PATCH', () => {
    afterEach(() => { sinon.restore() });

    it('Ao acessar a rota /matches/:id/finish, retorna status 200 e altera o status InProgress para finalizado', async () => {
      sinon.stub(MatchModel, 'update').resolves({} as any)

      const httpResponse = await chai.request(app).patch('/matches/:48/finish').set('Authorization', tokenValido)
      expect(httpResponse.status).to.be.equal(200)
      expect(httpResponse.body).to.deep.equal({ message: "Finished" })
    })

    it('Ao acessar a rota /matches/:id, retorna status 200 e altera dados da partida', async () => {
      sinon.stub(MatchModel, 'update').resolves({} as any)

      const httpResponse = await chai.request(app).patch('/matches/:48').set('Authorization', tokenValido)
      expect(httpResponse.status).to.be.equal(200)
      expect(httpResponse.body).to.deep.equal({ message: "Updated" })
    })
  })

})