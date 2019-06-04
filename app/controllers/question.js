const db = require('../models/index');
const QuestionModel = require('../models/question.js')(db.sequelize,db.Sequelize);

exports.update = function(req, res) {
    if(!req.params.questionId) return sendResponse(res, 400, "question's ID cannot be empty");
    validateBody(req.body);
    updateQuestion(req).then(function(updateStatus) {
        if(updateStatus[0] === 0) return sendResponse(res, 404, "Question not found with ID " + req.params.questionId + ".");
        if(updateStatus[0] === 1) return sendResponse(res, 200, "Question with ID equals to " + req.params.questionId + " updated successfully.");
        return sendResponse(res, 500, "Error updating question with ID " + req.params.questionId + ".");
    }).catch(function(err) {
        if(err.kind === 'ObjectId') return sendResponse(res, 404, "Question not found with ID " + req.params.questionId + ".");
        return sendResponse(res, 500, "Error updating question with ID " + req.params.questionId + ".");
    })
};

function sendResponse(res, status, message) {
    return res.status(status).send({message});
}

function updateQuestion(req) {
    return QuestionModel.update(
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
    )
}

function isValidChoice(choice) {
    return choice == "W" || choice == "F";
}

function validateUpdateBody(body) {
    if(!body.choice) return sendResponse(res, 400, "question's choice can not be empty");
    if(!isValidChoice(body.choice)) return sendResponse(res, 400, 'Only "W" (Work) and "F" (Family) options are valid for choice field.');
    if(!body.question_appears_datetime) return sendResponse(res, 400, "question's appears time can not be empty");
    if(!body.answered_question_datetime) return sendResponse(res, 400, "question's answered time can not be empty");
}

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
