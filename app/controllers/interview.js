var db = require('../models/index.js');
var InterviewModel = require('../models/interview.js')(db.sequelize, db.Sequelize);

exports.create = function(req, res) {
    if(!req.body.researcher_id) {
        return res.status(400).send({
            message: "Interview researcher_id can not be empty."
        });
    }

    var interview = new InterviewModel({
        researcher_id: req.body.researcher_id
    });

    interview.save()
        .then(function(data) {
            res.send(data);
        }).catch(function(err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the interview."
            });
        });
};

exports.findAll = function(req, res) {
    //TODO
};

exports.findOne = function(req, res) {
    //TODO
};

exports.update = function(req, res) {
    //Do nothing
};

exports.delete = function(req, res) {
    //Do nothing
};