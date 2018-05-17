var express = require('express'); //Assists us to build and prepare connections/routes easier
var passport = require('passport'); //Assists us with authentication
var session = require('express-session'); //
var bodyParser = require('body-parser');
var env = require('dotenv').load();
var models = require("./app/models");
var cors = require('cors')
var app = express();

//For BodyParser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//For Passaport
app.use(session({secret:'keyboard cat', resave:true, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors())

//Sync database
models.sequelize.sync().then(function () {
    console.log("Arbitrium database is ready.")
    var db = require('./app/models/index');
    var EventModel = require('./app/models/event.js')(db.sequelize, db.Sequelize);
    var events = require('./app/config/db/events')
    var ActivityModel = require('./app/models/activity.js')(db.sequelize, db.Sequelize);
    var activities = require('./app/config/db/activities')
    var ActivityPunctuationModel = require('./app/models/activity_punctuation.js')(db.sequelize, db.Sequelize);
    var activity_punctuations = require('./app/config/db/activity_punctuations')
    var InterviewModel = require('./app/models/interview.js')(db.sequelize, db.Sequelize);
    var interviews = require('./app/config/db/interviews')
    var ScheduleModel = require('./app/models/schedule.js')(db.sequelize, db.Sequelize);
    var schedules = require('./app/config/db/schedules')
    var WeekModel = require('./app/models/week.js')(db.sequelize, db.Sequelize);
    var weeks = require('./app/config/db/weeks')
    var DayModel = require('./app/models/day.js')(db.sequelize, db.Sequelize);
    var days = require('./app/config/db/days')
    var QuestionModel = require('./app/models/question.js')(db.sequelize, db.Sequelize);
    var questions = require('./app/config/db/questions')
    var HourModel = require('./app/models/hour.js')(db.sequelize, db.Sequelize);
    var hours = require('./app/config/db/hours')

    console.log("Cleaning database before insert...")

    

    questions.forEach(question => {
        QuestionModel.destroy({
            where: { id: question.id }
        })

    });

    days.forEach(day => {
        DayModel.destroy({
            where: { id: day.id }
        })
    });


    weeks.forEach(week => {
        WeekModel.destroy({
            where: { id: week.id }
        })

    });


    schedules.forEach(schedule => {
    ScheduleModel.destroy({
            where: { id: schedule.id }
       })
    });


    interviews.forEach(interview => {
        InterviewModel.destroy({
            where: { id: interview.id }
        })
    });


    activity_punctuations.forEach(activity_punctuation => {
        ActivityPunctuationModel.destroy({
            where: { id: activity_punctuation.id }
        })
    });


    activities.forEach(activity => {
        ActivityModel.destroy({
            where: { id: activity.id }
       })
    });


    events.forEach(event => {
        EventModel.destroy({
            where: { id: event.id }
        })
    });


    EventModel.bulkCreate(events).then(
    ActivityModel.bulkCreate(activities)).then(
    InterviewModel.bulkCreate(interviews)).then(
    ScheduleModel.bulkCreate(schedules)).then(
    WeekModel.bulkCreate(weeks)).then(
    DayModel.bulkCreate(days)).then(
    QuestionModel.bulkCreate(questions)).then(
    HourModel.bulkCreate(hours))

}).catch(function (err) {
    console.log(err, "Something went wrong while creating arbitrium_database.")
});

// Default route
app.get('/', function(req, res) {
    res.json({"message": "Welcome to Arbitrium Project."});
});

// Other routes
require('./app/routes/activity.js')(app);
require('./app/routes/question.js')(app);
require('./app/routes/interview.js')(app);
require('./app/routes/question.js')(app);
require('./app/routes/event.js')(app);
// Start server
app.listen(3000, function(err) {
    console.log("Server is listening on port 3000");
});
