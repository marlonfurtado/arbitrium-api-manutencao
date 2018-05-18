var db = require('../models/index.js');
var InterviewModel = require('../models/interview.js')(db.sequelize, db.Sequelize);
var ScheduleModel = require('../models/schedule.js')(db.sequelize, db.Sequelize);
var ResultModel = require('../models/result.js')(db.sequelize, db.Sequelize);

exports.create = async function(req, res) {
    // Will be used to storage the return of interview save
    var interviewResult;
    // Will  be used to concatenate multiple results of multiple queries
    var functionResult;

    // Validates mandatory parameters
    if(!req.body.researcher_id) {
        return res.status(400).send({
            message: "Interview researcher_id can not be empty."
        });
    }

    try {
        // Create interview model and save the interview record on database
        var interview = new InterviewModel({ researcher_id: req.body.researcher_id, initial_date: req.body.initial_date, conclusion_date: req.body.conclusion_date });
        interviewResult = await interview.save();

        // Take the auto generated ID of interview and save the of schedule record on database
        var schedule = new ScheduleModel({ interview_id: interviewResult.id });
        await schedule.save();

        //take the auto generated ID of interview and save the result record on database
        var result = new ResultModel({interview_id: interviewResult.id});
        await result.save();

        // TODO: Change it to ORM quering or by join, I didn't find a way to do it yet
        functionResult = await db.sequelize.query('SELECT i.id, i.researcher_id, i.initial_date, i.conclusion_date, i.created_at, i.updated_at FROM interviews i WHERE i.id = :interview_id',
            { replacements: { interview_id: interviewResult.id }, type: db.sequelize.QueryTypes.SELECT});

        functionResult[0].schedule = await db.sequelize.query('SELECT s.id, s.interview_id, s.created_at, s.updated_at FROM schedules s where s.interview_id = :interview_id',
            { replacements: { interview_id: interviewResult.id }, type: db.sequelize.QueryTypes.SELECT});
        
        // Return interviewResult JSON
        res.send(functionResult);
    } catch(err) {
        // If occur any error, send the error number 500 and describe what happen
        res.status(500).send({
            message: err.message || "Some error occurred while creating the interview."
        });
    }
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