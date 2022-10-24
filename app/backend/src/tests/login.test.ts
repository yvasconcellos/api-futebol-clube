import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app'
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;


describe('Teste rota Login', () => {
  describe('Método Post', () => {
    it('Se correto, retorna Status 200 e Token', async() => {
      const httpResponse = await chai.request(app).post('/login').send({
      email: 'user@user.com',
      password: 'secret_user'
      })

      expect(httpResponse.status).to.equal(200)
      expect(httpResponse.body).to.haveOwnProperty('token')
    })

    it('Se não passar o email, retorna Status 404 e mensagem "All fields must be filled"', async () => {
      const httpResponse = await chai.request(app).post('/login').send({
        password: 'senha_qualquer'
        })
        
        expect(httpResponse.status).to.be.equal(404)
        expect(httpResponse.body).to.deep.equal({ message: "All fields must be filled" })
    })

    it('Se não passar o password, retorna Status 404 e mensagem "All fields must be filled"', async () => {
      const httpResponse = await chai.request(app).post('/login').send({
        email: 'email_qualquer'
        })
        
        expect(httpResponse.status).to.be.equal(404)
        expect(httpResponse.body).to.deep.equal({ message: "All fields must be filled" })
    })

    it('Se email incorreto, retorna Status 401 e mensagem "Incorrect email or password"', async() => {
      const httpResponse = await chai.request(app).post('/login').send({
      email: 'usererrado@user.com',
      password: 'secret_user'
      })

      expect(httpResponse.status).to.equal(401)
      expect(httpResponse.body).to.deep.equal({ message: "Incorrect email or password" })
    })

    it('Se password incorreto, retorna Status 401 e mensagem "Incorrect email or password"', async() => {
      const httpResponse = await chai.request(app).post('/login').send({
      email: 'user@user.com',
      password: 'secret_user_errado'
      })

      expect(httpResponse.status).to.equal(401)
      expect(httpResponse.body).to.deep.equal({ message: "Incorrect email or password" })
    })

  })

});
