//During the test the env variable is set to test
//process.env.NODE_ENV = 'test';


let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style

chai.use(chaiHttp);


describe('/GET', () => {
    it('it should GET "Welcome to Arbitrium Project."', (done) => {
        chai.request(server)
        .get('/')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('message').eql('Welcome to Arbitrium Project.');
            done();
        });
    });
});

describe('/GET activities', () => {
    it('it should GET all activities"', (done) => {
        chai.request(server)
        .get('/activities')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            expect(res.body).to.have.length(17);
            done();
        });
    });
});

describe('/GET activity by id', () => {
    it('it should GET one activity"', (done) => {
        chai.request(server)
        .get('/activities/1')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id').eql(1);
            res.body.should.have.property('description').eql('Dormir');
            res.body.should.have.property('created_at').eql('2019-06-09T20:46:45.000Z');
            res.body.should.have.property('updated_at').eql('2019-06-09T20:46:45.000Z');

            done();
        });
    });
});

describe('/GET events', () => {
    it('it should GET all events"', (done) => {
        chai.request(server)
        .get('/events')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            expect(res.body).to.have.length(44);
            done();
        });
    });
});

describe('/GET event by id', () => {
    it('it should GET one event"', (done) => {
        chai.request(server)
        .get('/events/1')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('id').eql(1);
            res.body.should.have.property('description').eql('Seu chefe o convida para um happy hour com os diretores.  Ao mesmo tempo, você recebe uma mensagem de seu cônjuge lembrando da apresentação no colégio do seu filho. O que você faz?');
            res.body.should.have.property('family_points').eql(15);
            res.body.should.have.property('work_points').eql(5);
            res.body.should.have.property('created_at').eql('2019-06-09T20:46:45.000Z');
            res.body.should.have.property('updated_at').eql('2019-06-09T20:46:45.000Z');
            res.body.should.have.property('op_work').eql('Ir para o Happy Hour');
            res.body.should.have.property('op_family').eql('Ir à Apresentação');
            res.body.should.have.property('min_hour').eql(9);
            res.body.should.have.property('max_hour').eql(18);
            
            done();
        });
    });
});


describe('/GET result', () => {
    it('it should GET the result"', (done) => {
        chai.request(server)
        .get('/result/interview/1')
        .end((err, res) => {
            res.should.have.status(200);                
            done();
        });
    });
});

describe('/GET week', () => {
    it('it should GET the week"', (done) => {
        chai.request(server)
        .get('/week/last-week/1')
        .end((err, res) => {
            res.should.have.status(200);                
            done();
        });
    });
});