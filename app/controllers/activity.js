var db = require('../models/index');
var AcitivityModel = require('../models/activity.js')(db.sequelize,db.Sequelize);

exports.create = function(req, res) {
    //Do nothing;
};

exports.findAll = function(req, res) {
    AcitivityModel.findAll()
        .then( function(activities) {
            res.send(activities);
        }).catch(function(err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving all activities."
            });
        });
};

exports.findOne = function(req, res) {
    AcitivityModel.findOne({
        where: {
            id: req.params.activityId
        }
        }).then(function(activity) {
            res.send(activity);
        }).catch(function(err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving a single activity."
            });
        });
};

exports.update = function(req, res) {
    //Do nothing;
};

exports.delete = function(req, res) {
    //Do nothing;
};