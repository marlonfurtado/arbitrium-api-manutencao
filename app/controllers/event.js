var db = require('../models/index.js');
var EventModel = require('../models/event.js')(db.sequelize,db.Sequelize);

exports.create = function(req,res){
    //do nothing
};

exports.findAll = function(req, res) {
    EventModel.findAll()
        .then( function(events) {
            res.send(events);
        }).catch(function(err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving all activities."
            });
        });
};

exports.findOne = function(req, res) {
    EventModel.findOne({
        where: {
            id: req.params.eventId
        }
        }).then(function(event) {
            res.send(event);
        }).catch(function(err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving a single activity."
            });
        });
};

exports.update = function(req, res) {
    //do nothing
};

exports.delete = function(req, res) {
    //do nothing
};