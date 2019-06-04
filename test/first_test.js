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

