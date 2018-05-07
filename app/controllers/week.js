var db = require('../models/index.js');
var WeekModel = require('../models/week.js')(db.sequelize, db.Sequelize);
var DayModel = require('../models/day.js')(db.sequelize, db.Sequelize);
var HourModel = require('../models/hour.js')(db.sequelize, db.Sequelize);

exports.create = async function(req, res) {
    // Will be used to storage the return of week save
    var weekResult;
    // Will be used to concatenate multiple results of multiple queries
    var functionResult;
    // Will be used to catch all inside promises errors to throw if it occours
    var promisesErrors= "";
    var validationsErrors = "";

    // Validates mandatory parameters
    validationsErrors = await postValidations(req.body.schedule_id, req.body.week_number, req.body.days);

    console.log(validationsErrors);

    // Check if we got any input validation errors
    if(validationsErrors || !(0 === validationsErrors.length)) {
        return res.status(400).send({
            message: validationsErrors
        });
    }

    try {
        // Create week model and save the week record on database
        var week = new WeekModel({ schedule_id: req.body.schedule_id, week_number: req.body.week_number });
        weekResult = await week.save();

        await req.body.days.forEach(async function(day) {
            try {
                var dayModel = new DayModel({ week_id: weekResult.id, day_number: day.day_number});
                var dayResult = await dayModel.save();

                await day.hours.forEach(async function(hour) {
                    try {
                        var hour = new HourModel({day_id: dayResult.id, activity_id: hour.activity_id, hour_number: hour.hour_number});
                        var hourResult = await hour.save();
                    } catch (err) {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the hour."
                        });
                    }
                });
            } catch (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the day."
                });
            }
        });
        
        res.send(weekResult);
    } catch(err) {
        // If occur any error, send the error number 500 and describe what happen
        res.status(500).send({
            message: err.message || "Some error occurred while creating the week."
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

async function postValidations(scheduleId, weekNumber, days) {
    var validationErrors = "";
    if(!scheduleId) { 
        validationErrors= "Week schedule_id can not be empty."
    } else if(!weekNumber) { 
        validationErrors = "Week week_number can not be empty."
    }  else if(!days || days.length!==7) {
        validationErrors= "Number of days can not be different than 7 to create a new week."
    } else {
        await days.forEach(async function(day) {
            if(!validationErrors && 0 === validationErrors.length) {
                if(!day.day_number) {
                    validationErrors= "Day day_number can not be empty.";
                } else if(!day.hours || day.hours.length!==24) {
                    validationErrors= "Number of hours in a day can not be different than 24 to create a day."
                } else {
                    await day.hours.forEach(async function(hour) {
                        if(!validationErrors && 0 === validationErrors.length) {
                            if(!hour.activity_id) {
                                validationErrors= "Hour activity_id can not be empty."
                            } else if (!hour.hour_number) {
                                validationErrors= "Hour hour_number can not be empty."
                            }
                        }
                    });
                }
            }
        });
    }

    return validationErrors;
}