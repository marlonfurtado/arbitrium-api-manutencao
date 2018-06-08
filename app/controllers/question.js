var db = require('../models/index');
var QuestionModel = require('../models/question.js')(db.sequelize,db.Sequelize);

//Need the put function, so i need to create the update function
exports.update = function(req, res) {
    if(!req.params.questionId) {
        return res.status(400).send({
            message: "question's ID cannot be empty"
        });
    }

    if(!req.body.choice) {
        return res.status(400).send({
            message: "question's choice can not be empty"
        });
    }

    QuestionModel.update(
        { choice: req.body.choice },
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
    })
};


exports.create = function(req, res) {
    // Validates mandatory parameters
    var errors = {};
    var body = req.body;
    if(!body.interview_id)
        errors['interview_id'] = 'This field is required.'
    if(!body.event_id)
        errors['event_id'] = 'This field is required.'

    if (Object.keys(errors).length) {
        return res.status(400).send({
            'errors': errors
        });
    }

    try {
        var questionDateTime = Date.parse(body.question_appears_datetime);
        var answeredDateTime = Date.parse(body.answered_question_datetime);
        var choice = body.choice;

        if (choice != "W" && choice != "F") {
            return res.status(400).send({
                'errors': 'Only "W" (Work) and "F" (Family) options are valid foi choice field.'
            });
        }
        console.log('Valor de event_id: ' + body.event_id);
        var question = new QuestionModel({
            interview_id: body.interview_id,
            event_id: body.event_id,
            question_appears_datetime: questionDateTime,
            answered_question_datetime: answeredDateTime,
            choice: choice
        });

        question.save()
        .then(function(result) {
            res.send(result);
        }).catch(function(err) {
            res.status(500).send({
                'errors': err.message
            });
        }); 
    } catch(err) {
        res.status(500).send({
            'errors': err.message
        });
    }
};

exports.findAll = function(req, res) {
    //Do nothing;
};

exports.findOne = function(req, res) {
    //Do nothing;
};

exports.delete = function(req, res) {
    //Do nothing;
};
