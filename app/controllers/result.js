const db = require('../models/index');
const InterviewModel = require('../models/interview.js')(db.sequelize,db.Sequelize);
const ResultModel = require('../models/result.js')(db.sequelize,db.Sequelize);
const ScheduleModel = require('../models/schedule.js')(db.sequelize, db.Sequelize);
const WeekModel = require('../models/week.js')(db.sequelize, db.Sequelize);
const DayModel = require('../models/day.js')(db.sequelize, db.Sequelize);
const HourModel = require('../models/hour.js')(db.sequelize, db.Sequelize);
const ActivityPunctuationModel = require('../models/activity_punctuation.js')(db.sequelize, db.Sequelize);
let activitiesList = []
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
    activitiesList = []
    // Make validations
    let isResultExists = await checkIfResultForInterviewExists(req.params.interviewId);
    
    // Rise if the interview ID doesn't exists
    if(!isResultExists) {
        return res.status(400).send({
            message: 'No results for interview ID ' + req.params.interviewId
        });
    }

    // Get the last result of a interview, this will be need if there's more than one result
    const resultId = await getLastResultIdByInterviewId(req.params.interviewId);

    // Creating object of results
    let resultPoints = {
        familyAcitivity: 0,
        familyEvent: 0,
        workAcitivity: 0,
        workEvent: 0,
        healthAcitivity: 150,
        moneyAcitivity: 150
    };

    // This variable will hold the id of the last id, that will be necessary when getting the last result
    let lastDayId = 0;
    
    // Get schedule of an interview
    let schedule = await ScheduleModel.findOne( { where: { interview_id: req.params.interviewId } } );
    
    // Creating object of activities
    let activities = await getActivitiesByPointTypes();

    

    // Get weeks of a schedule
    const scheduleWeeks = await WeekModel.findAll( { where: { schedule_id: schedule.id } } );
    for(let i = 0; i<scheduleWeeks.length; i++) {
        // Get days of a week
        const weekDays = await DayModel.findAll( { where: { week_id: scheduleWeeks[i].id }, raw: true } );

        for(let j = 0; j<weekDays.length; j++) {
            // Get hours of a day
            const dayHours = await HourModel.findAll( { where: { day_id: weekDays[j].id }, raw: true } );
            //Get number of occurance to activities
            for(let k = 0; k<dayHours.length; k++) {
                await addOccuranceToActivity(activities, dayHours[k].activity_id);
            }

            await evaluateDay(resultPoints, activities);
        }
        //  Evaluate hour
        await evaluateHour(resultPoints, activities);

        await evaluateWeek(resultPoints, activities);

        lastDayId = weekDays[weekDays.length-1].id;
    }
    
    await addQuestionPointsToResultPoints(resultPoints, req.params.interviewId);
    
    await updateResult(resultPoints, req.params.interviewId, lastDayId, scheduleWeeks[scheduleWeeks.length-1].id);

    // return the recalculated result
    await ResultModel.findOne({
        where: {
            interview_id: req.params.interviewId,
            week_id: scheduleWeeks[scheduleWeeks.length-1].id
        }
    }).then(function(result) {
        res.send(result);
    }).catch(function(err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving a single result by interview."
        });
    });
    console.log(activitiesList)

    checkObtainedResults()
};

function checkObtainedResults(){
    let len = activitiesList.length
    let fPoints = 0
    let wPoints = 0
    let hPoints = 0
    let mPoints = 0
    for(let i = 0; i< len; i++){
        let currentActivity = activitiesList[i]
        fPoints += currentActivity.familyPoints
        wPoints += currentActivity.workPoints
        hPoints += currentActivity.healthPoints
        mPoints += currentActivity.moneyPoints
    }

    console.log("Final results not considering events:\nFamily: %d\nWork: %d\nHealth: %d\nMoney: %d\n",fPoints,wPoints,hPoints,mPoints)
}

async function checkIfResultForInterviewExists(interviewId) {
    let result = await ResultModel.findOne( { where: { interview_id: interviewId } } );
    
    return result!=null;
}

async function getActivitiesByPointTypes() {
    let activities = {
        dayActivities: { },
        weekActivities: { },
        hourActivities: { }
    };

    activities.dayActivities = await db.sequelize.query(
        'SELECT distinct a.id, 0 as numberOfOccurrences FROM activities as a INNER JOIN activity_punctuations as ap on ap.activity_id = a.id WHERE ap.points_type = :pointType',
        { replacements: { 
            pointType: 'D' 
        }, type: db.sequelize.QueryTypes.SELECT
    });

    activities.weekActivities = await db.sequelize.query(
        'SELECT distinct a.id, 0 as numberOfOccurrences FROM activities as a INNER JOIN activity_punctuations as ap on ap.activity_id = a.id WHERE ap.points_type = :pointType',
        { replacements: { 
            pointType: 'S' 
        }, type: db.sequelize.QueryTypes.SELECT
    });

    activities.hourActivities = await db.sequelize.query(
        'SELECT distinct a.id, 0 as numberOfOccurrences FROM activities as a INNER JOIN activity_punctuations as ap on ap.activity_id = a.id WHERE ap.points_type = :pointType',
        { replacements: { 
            pointType: 'H' 
        }, type: db.sequelize.QueryTypes.SELECT
    });

    return activities;
}

//evaluate type H activities (hour activities)
async function evaluateHour(resultPoints, activities) {

    for(let k = 0; k<activities.hourActivities.length; k++) {
        if(activities.hourActivities[k].numberOfOccurrences!=0) {
            let numberOfOccurrences = activities.hourActivities[k].numberOfOccurrences
            let activityPoints = await getActivityPoints(activities.hourActivities[k].id, activities.hourActivities[k].numberOfOccurrences);

            resultPoints.familyAcitivity += activityPoints.family_points * numberOfOccurrences;
            resultPoints.workAcitivity += activityPoints.work_points * numberOfOccurrences;
            resultPoints.healthAcitivity += activityPoints.health_points * numberOfOccurrences;
            resultPoints.moneyAcitivity += activityPoints.money_points * numberOfOccurrences;
            
            dataOfActivity = {
                activityId: activities.hourActivities[k].id,
                activityTipe: "H",
                occurrences: activities.hourActivities[k].numberOfOccurrences,
                familyPoints: activityPoints.family_points * numberOfOccurrences,
                workPoints: activityPoints.work_points * numberOfOccurrences,
                healthPoints: activityPoints.health_points * numberOfOccurrences,
                moneyPoints: activityPoints.money_points * numberOfOccurrences
            }
            activitiesList.push(dataOfActivity)

            activities.hourActivities[k].numberOfOccurrences = 0;
        }
    }

    return resultPoints;
}

async function evaluateDay(resultPoints, activities) {

    for(let k = 0; k<activities.dayActivities.length; k++) {
        if(activities.dayActivities[k].numberOfOccurrences!=0) {
            let activityPoints = await getActivityPoints(activities.dayActivities[k].id, activities.dayActivities[k].numberOfOccurrences);

            resultPoints.familyAcitivity += activityPoints.family_points;
            resultPoints.workAcitivity += activityPoints.work_points;
            resultPoints.healthAcitivity += activityPoints.health_points;
            resultPoints.moneyAcitivity += activityPoints.money_points;

            dataOfActivity = {
                activityId: activities.dayActivities[k].id,
                activityTipe: "D",
                occurrences: activities.dayActivities[k].numberOfOccurrences,
                familyPoints: activityPoints.family_points,
                workPoints: activityPoints.work_points,
                healthPoints: activityPoints.health_points,
                moneyPoints: activityPoints.money_points
            }
            activitiesList.push(dataOfActivity)

            activities.dayActivities[k].numberOfOccurrences = 0;

            
        }
    }

    return resultPoints;
}

async function evaluateWeek(resultPoints, activities) {
    for(let k = 0; k<activities.weekActivities.length; k++) {
        if(activities.weekActivities[k].numberOfOccurrences!=0) {
            let activityPoints = await getActivityPoints(activities.weekActivities[k].id, activities.weekActivities[k].numberOfOccurrences);

            resultPoints.familyAcitivity += activityPoints.family_points;
            resultPoints.workAcitivity += activityPoints.work_points;
            resultPoints.healthAcitivity += activityPoints.health_points;
            resultPoints.moneyAcitivity += activityPoints.money_points;

            dataOfActivity = {
                activityId: activities.weekActivities[k].id,
                activityTipe: "S",
                occurrences: activities.weekActivities[k].numberOfOccurrences,
                familyPoints: activityPoints.family_points,
                workPoints: activityPoints.work_points,
                healthPoints: activityPoints.health_points,
                moneyPoints: activityPoints.money_points
            }
            activitiesList.push(dataOfActivity)

            activities.weekActivities[k].numberOfOccurrences = 0;
        }
    }

    return resultPoints;
}

async function addQuestionPointsToResultPoints(resultPoints, interviewId) {
    const questions = await getAllQuestionsOfInterview(interviewId);

    for(let i = 0; i<questions.length; i++) {
        await includeEventToResults(resultPoints, questions[i].id);
    }

    return resultPoints;
}

async function getAllQuestionsOfInterview(interviewId) {
    const allQuestionsOfInterview = await db.sequelize.query(
        "SELECT q.id, q.event_id as eventId, q.choice FROM questions q where q.interview_id = :interviewId and q.choice != ''",
        {
            replacements: {
                interviewId: interviewId
            }
            , type: db.sequelize.QueryTypes.SELECT
            , raw: true
        }
    );

    return allQuestionsOfInterview;
}

async function includeEventToResults(resultPoints, questionId) {
    let eventPoints = await getEventPoints(questionId);

    if(eventPoints.choice=='F') {
        resultPoints.familyEvent += eventPoints.family_points;
    } else if(eventPoints.choice=='W') {
        resultPoints.workEvent += eventPoints.work_points;
    }

    return resultPoints;
}

async function getActivityPoints(activityId, occuranceNumber) {
    let activityPoints = await db.sequelize.query(
        'SELECT family_points, health_points, money_points, work_points FROM activity_punctuations WHERE activity_id = :activityId AND initial_occurences_number <= :occuranceNumber AND final_occurences_number >= :occuranceNumber LIMIT 1',
        { 
            replacements: { 
                activityId: activityId,
                occuranceNumber: occuranceNumber
            }
            , type: db.sequelize.QueryTypes.SELECT
            , raw: true
        }
    );

    return activityPoints[0];
}

async function getEventPoints(questionId) {
    let eventPoints = await db.sequelize.query(
        'SELECT e.family_points, e.work_points, q.choice FROM events e, questions q WHERE e.id = q.event_id AND q.id = :questionId',
        {
            replacements: {
                questionId: questionId
            }
            , type: db.sequelize.QueryTypes.SELECT
            , raw: true
        }
    );

    return eventPoints[0];
}

async function getLastResultIdByInterviewId(interviewId) {
    const resultId = await db.sequelize.query(
        'SELECT r.id FROM results r where r.interview_id = :interviewId ORDER BY r.id DESC LIMIT 1',
        {
            replacements: {
                interviewId: interviewId
            }
            , type: db.sequelize.QueryTypes.SELECT
            , raw: true
        }
    );

    return Promise.resolve(resultId[0].id);
}

async function updateResult(resultPoints, interviewId, dayId, weekId) {
    await ResultModel.update( {
            status_family_activity: resultPoints.familyAcitivity,
            status_family_event: resultPoints.familyEvent,
            status_work_activity: resultPoints.workAcitivity,
            status_work_event: resultPoints.workEvent,
            status_health_activity: resultPoints.healthAcitivity,
            status_money_activity: resultPoints.moneyAcitivity,
            day_id: dayId
        },
        {
            where: {
                interview_id: interviewId,
                week_id: weekId
            }
        }
    );
}

function addOccuranceToActivity(activities, activityId) {
    for(let a = 0; a<activities.dayActivities.length; a++) {
        if(activities.dayActivities[a].id === activityId) {
            activities.dayActivities[a].numberOfOccurrences++;
        }
    }

    for(let a = 0; a<activities.weekActivities.length; a++) {
        if(activities.weekActivities[a].id === activityId) {
            activities.weekActivities[a].numberOfOccurrences++;
        }
    }

    //add number of occurrence of hour activities
    for(let a = 0; a<activities.hourActivities.length; a++) {
        if(activities.hourActivities[a].id === activityId) {
            activities.hourActivities[a].numberOfOccurrences++;
        }
    }
}

exports.update = function(req, res) {
    //Do nothing;
};

exports.delete = function(req, res) {
    //Do nothing;
};