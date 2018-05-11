var db = require('../models/index');
var QuestionModel = require('../models/activity.js')(db.sequelize,db.Sequelize);

//Need the put function, so i need to create the update function
exports.update = function(req, res) {
    if(!req.params.questionId) {
        return res.status(400).send({
            message: "question's ID cannot be empty"
        });
    }

    if(!req.body.description) {
        return res.status(400).send({
            message: "question's description can not be empty"
        });
    }

    QuestionModel.update(
        { description: req.body.description },
        { where: { id: req.params.questionId } }
    ).then(function(updateStatus) {
        if(updateStatus[0] === 0) {
            return res.status(404).send({
                message: "Question not found with ID " + req.params.questionId + "."
            });
        } else if(updateStatus[0] === 1) {
            return res.status(200).send({
                message: "Question with ID equals to " + req.params.questionId + " updated successfully."
            });
        } else {
            return res.status(500).send({
                message: "Error updating question with ID " + req.params.questionId + "."
            });
        }
    }).catch(function(err) {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Question not found with ID " + req.params.questionId + "."
            });
        }
        return res.status(500).send({
            message: "Error updating question with ID " + req.params.questionId + "."
        });
    });

};