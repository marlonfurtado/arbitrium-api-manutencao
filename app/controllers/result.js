var db = require('../models/index');
var ResultModel = require('../models/result.js')(db.sequelize,db.Sequelize);
var ScheduleModel = require('../models/schedule.js')(db.sequelize, db.Sequelize);
var WeekModel = require('../models/week.js')(db.sequelize, db.Sequelize);
var DayModel = require('../models/day.js')(db.sequelize, db.Sequelize);

exports.create = function(req, res) {
    //Do nothing;
};

exports.findAll = function(req, res) {
    //Do nothing;
};

exports.findOne = function(req, res) {
    ResultModel.findOne({
        where: {
            interview_id: req.params.interviewId
        }
        }).then(function(result) {
            res.send(result);
        }).catch(function(err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving a single result by interview."
            });
        });
};

exports.calcResults = async function(req, res) {
    //Starting the variable that shall hold all errors inside promises
    var promisesErrors = "";
    
    //get Results
    var interviewResult = await ResultModel.findOne({ where: { interview_id: req.params.interviewId } } );

    //get schedule
    var interviewSchedule = await ScheduleModel.findOne({ where: { interview_id: req.params.interviewId } });

    //get weeks
    var scheduleWeeks = await WeekModel.find({ where: { schedule_id: interviewSchedule.id } } );

    //foreach weeks
    await scheduleWeeks.forEach(async function(weeks) {
        try {
            var weekDays = await DayModel.find({ where: { week_id: weeks.id } } );

            
        } catch(err) {
            promisesErrors = "Error while running inside weeks of a interview.";
        }
    });

    //foreach days

    //activity punctuations x occourances calculates

    ResultModel.findOne({
        where: {
            id: req.params.resultId
        }
        }).then(function(result) {

            res.send(result);
        }).catch(function(err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving a single result."
            });
        });
};

exports.update = function(req, res) {
    //Do nothing;
};

exports.delete = function(req, res) {
    //Do nothing;
};