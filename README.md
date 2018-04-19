# Arbitrium

> Uma aplicação para ajudar a entender como as pessoas tomam decisões e fazem a gestão do tempo em seu cotidiano.

## Tecnologias Utilizadas
- NodeJS - [saiba mais](https://nodejs.org/en/docs/)
- ExpressJS - [saiba mais](https://expressjs.com/)
- SequelizeJS - [saiba mais](http://docs.sequelizejs.com/)
- PassportJS - [saiba mais](http://www.passportjs.org/)
- MySQL - [saiba mais](https://www.mysql.com/)
- Postman - [saiba mais](https://www.getpostman.com/)
- Javascipt 

## Pré-Requisitos
- NodeJs e NPM - [como instalar](https://www.npmjs.com/get-npm)
- MySQL Community Server - [como instalar](https://dev.mysql.com/downloads/)


## Iniciando
- Clone o repositório:  
`git clone http://www.tools.ages.pucrs.br/arbitrium/api.git`

- Entre no diretório:  
`cd api`

- Adicionar senha do MySQL local ao servidor:
> Abrir arquivo app/config/sequelize_config.json e adicionar a senha na sessão de "development", campo "password".

- Instale as dependências:  
`npm install`

- Iniciando o projeto:  
`npm start`

- Acesse no navegador:  
`http://localhost:3000`

> Os comandos acima iniciam apenas o *servidor* da aplicação.  
> Para uma experiência completa inicie também o Frontend, saiba mais [aqui](http://www.tools.ages.pucrs.br/arbitrium/web).

## Estrutura

```
app/
├─ config/
│  ├─ db/
│  │  ├─ createDbScript.sql
│  │  ├─ dropTablesScript.sql
│  ├─ sequelize_config.json
├─ controllers/
│  ├─ activity.js
│  ├─ interview.js
├─ middlewares/
├─ models/
│  ├─ activity_punctuation.js
│  ├─ activity.js
│  ├─ day.js
│  ├─ event.js
│  ├─ hour.js
│  ├─ index.js
│  ├─ interview.js
│  ├─ question.js
│  ├─ researcher.js
│  ├─ schedule.js
│  ├─ week.js
├─ routes/
│  ├─ activity.js
│  ├─ interview.js
.env
package.json
server.js
```

## Comandos

``` bash
# instalar dependências
npm install

# server em localhost:3000
npm start
```

## Saiba mais
- Criar aplicação simples usando Passport, SequelizeJS e MySQL: [tutorial](https://code.tutsplus.com/tutorials/using-passport-with-sequelize-and-mysql--cms-27537)

- Criar CRUD com RESTFul APIs: [tutorial](https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/)

- Criar API Rest escalável: [tutorial](https://codeburst.io/build-a-rest-api-for-node-mysql-2018-jwt-6957bcfc7ac9)

- Arbitrium API: [repositório](http://www.tools.ages.pucrs.br/arbitrium/api)

- Sobre o Arbitrium: [wiki](http://www.tools.ages.pucrs.br/arbitrium/api/wikis/home)
