const db = require('../models/index.js');
const WeekModel = require('../models/week.js')(db.sequelize, db.Sequelize);
const DayModel = require('../models/day.js')(db.sequelize, db.Sequelize);
const HourModel = require('../models/hour.js')(db.sequelize, db.Sequelize);
const ResultModel = require('../models/result.js')(db.sequelize, db.Sequelize);

exports.create = async function(req, res) {
    // Will be used to storage the return of week save
    let weekResult;
    // Will be used to concatenate multiple results of multiple queries
    let functionResult;
    // Will be used to catch all inside promises errors to throw if it occours
    let promisesErrors= "";
    let validationsErrors = "";

    // Validates mandatory parameters
    validationsErrors = await postValidations(req.body.schedule_id, req.body.week_number, req.body.days);

    // Check if we got any input validation errors
    if(validationsErrors || !(0 === validationsErrors.length)) {
        return res.status(400).send({
            message: validationsErrors
        });
    }

    try {
        // Create week model and save the week record on database
        const week = new WeekModel(
            { 
                schedule_id: req.body.schedule_id, 
                week_number: req.body.week_number 
            }
        );
        weekResult = await week.save();

        let days = req.body.days;

        await days.forEach(async function(day) {
            try {
                const dayModel = new DayModel({ week_id: weekResult.id, day_number: day.day_number});
                let dayResult = await dayModel.save();
                let dayHours = day.hours;

                for(let j = 0; j<dayHours.length; j++) {
                    try {
                        const hour = new HourModel(
                            { 
                                day_id: dayResult.id,
                                activity_id: dayHours[j].activity_id,
                                hour_number: dayHours[j].hour_number
                            }
                        );

                        await hour.save();
                    } catch (err) {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the hour."
                        });
                    }
                }
            } catch (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the day."
                });
            }
        });
        
        const interviewId = await getInterviewIdByScheduleId(req.body.schedule_id);
        await createWeekResultLine(interviewId, weekResult.id);
        
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

exports.findLastWeek = async function(req, res) {
    const scheduleId = await getScheduleId(req.params.interviewId);

    let lastWeek = await getLastWeek(scheduleId);

    if(!lastWeek) {
        return res.status(400).send({
            message: 'No weeks for interview ID ' + req.params.interviewId
        });
    }

    lastWeek.days = await getWeekDays(lastWeek.id);

    for(let i = 0; i<lastWeek.days.length; i++) {
        lastWeek.days[i].hours = await getDayHoursAndActivities(lastWeek.days[i].id);
    }

    res.send(lastWeek);
}

async function getScheduleId(interviewId) {
    const interviewSchedule = await db.sequelize.query(
        'SELECT s.id FROM schedules s WHERE s.interview_id = :interviewId',
        {
            replacements: {
                interviewId: interviewId
            }
            , type: db.sequelize.QueryTypes.SELECT
            , raw: true
        }
    );

    return interviewSchedule[0].id;
}

async function getLastWeek(scheduleId) {
    const lastWeek = await db.sequelize.query(
        'SELECT w.id, w.week_number as weekNumber FROM weeks w WHERE w.schedule_id = :scheduleId ORDER BY week_number DESC LIMIT 1',
        { 
            replacements: { 
                scheduleId: scheduleId
            }
            , type: db.sequelize.QueryTypes.SELECT
            , raw: true
        }
    );

    return lastWeek[0];
}

async function getWeekDays(weekId) {
    const weekDays = await db.sequelize.query(
        'SELECT d.id, d.day_number as dayNumber FROM days d WHERE d.week_id = :weekId ORDER BY d.day_number ASC',
        {
            replacements: {
                weekId: weekId
            }
            , type: db.sequelize.QueryTypes.SELECT
            , raw: true
        }
    );

    return weekDays;
}

async function getDayHoursAndActivities(dayId) {
    const dayHours = await db.sequelize.query(
        'SELECT h.id, h.activity_id as activityId, h.hour_number as hourNumber FROM hours h WHERE day_id = :dayId ORDER BY h.hour_number ASC',
        {
            replacements: {
                dayId: dayId
            }
            , type: db.sequelize.QueryTypes.SELECT
            , raw: true
        }
    );

    return dayHours;
}

async function getInterviewIdByScheduleId(scheduleId) {
    const interviewId = await db.sequelize.query(
        'SELECT s.interview_id as interviewId FROM schedules s WHERE s.id = :scheduleId'
        , { 
            replacements: { 
                scheduleId: scheduleId 
            }
            , type: db.sequelize.QueryTypes.SELECT
        }
    );

    return interviewId[0].interviewId;
}

async function createWeekResultLine(interviewId, weekId) {
    let result = new ResultModel(
        {
            interview_id: interviewId,
            week_id: weekId
        }
    );
    await result.save();

    return result;
}

async function postValidations(scheduleId, weekNumber, days) {
    let validationErrors = "";
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
                            } else if (hour.hour_number !== 0 && !hour.hour_number) {
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