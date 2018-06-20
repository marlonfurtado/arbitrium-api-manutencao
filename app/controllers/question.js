const db = require('../models/index');
const QuestionModel = require('../models/question.js')(db.sequelize,db.Sequelize);

//Need the put function, so i need to create the update function
exports.update = function(req, res) {
    if(!req.params.questionId) {
        return res.status(400).send({
            message: "question's ID cannot be empty"
        });
    } else if(!req.body.choice) {
        return res.status(400).send({
            message: "question's choice can not be empty"
        });
    } else if (req.body.choice != "W" && req.body.choice != "F") {
        return res.status(400).send({
            message: 'Only "W" (Work) and "F" (Family) options are valid for choice field.'
        });
    } else if(!req.body.question_appears_datetime) {
        return res.status(400).send({
            message: "question's appears time can not be empty"
        });
    } else if(!req.body.answered_question_datetime) {
        return res.status(400).send({
            message: "question's answered time can not be empty"
        });
    }

    QuestionModel.update(
        { 
            choice: req.body.choice,
            question_appears_datetime: Date.parse(req.body.question_appears_datetime),
            answered_question_datetime: Date.parse(req.body.answered_question_datetime)
        },
        {
            where: {
                event_id: req.params.questionId,
                interview_id: req.body.interview_id
            }
        }
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
    let errors = {};
    const body = req.body;
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
        console.log('Valor de event_id: ' + body.event_id);
        const question = new QuestionModel({
            interview_id: body.interview_id,
            event_id: body.event_id
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
