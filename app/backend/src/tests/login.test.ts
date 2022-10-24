import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app'
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;
const tokenValido = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjY2NjI2ODM5fQ.Lm1hEYvaZ00GsWu-oy3n4Q38gFgI74RBQ2ufyK1EsKQ"


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

    it('Se não passar o email, retorna Status 400 e mensagem "All fields must be filled"', async () => {
      const httpResponse = await chai.request(app).post('/login').send({
        password: 'senha_qualquer'
        })
        
        expect(httpResponse.status).to.be.equal(400)
        expect(httpResponse.body).to.deep.equal({ message: "All fields must be filled" })
    })

    it('Se não passar o password, retorna Status 400 e mensagem "All fields must be filled"', async () => {
      const httpResponse = await chai.request(app).post('/login').send({
        email: 'email_qualquer'
        })
        
        expect(httpResponse.status).to.be.equal(400)
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
  
  describe('Método GET' ,() => {
    it('Testa se ao passar token válido, retorna o Role com status 200' , async() => {
      const httpResponse = await chai.request(app).get('/login/validate').set('Authorization', tokenValido)
        expect(httpResponse.status).to.equal(200)
        expect(httpResponse.body).to.deep.equal({ role: "admin" })
      })

    })
  });
