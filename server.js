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
    var ActivityModel = require('./app/models/activity.js')(db.sequelize, db.Sequelize);
    var activities = require('./app/config/db/activities')

    console.log('populate database with activities...')
    activities.forEach(activity => {
        ActivityModel.destroy({
            where: { id: activity.id }
        })

        ActivityModel.create(activity)
    });

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
