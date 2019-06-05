//During the test the env variable is set to test
//process.env.NODE_ENV = 'test';


let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

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

describe('/GET all activities', () => {
    it('it should GET all activities"', (done) => {
        chai.request(server)
        .get('/activities')
        .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('Array');
                res.body.should.have.length(17);
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
                res.body.should.have.property('description');
                res.body.should.have.property('description').eql('Dormir');
                res.body.should.have.property('created_at');
                res.body.should.have.property('created_at').eql('2019-06-04T23:00:43.000Z');
                res.body.should.have.property('updated_at');
                res.body.should.have.property('updated_at').eql('2019-06-04T23:00:43.000Z');
            done();
        });
    });
});

