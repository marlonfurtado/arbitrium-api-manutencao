"use strict";
 
//var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config', 'sequelize_config.json'))[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};

//fs
//    .readdirSync(__dirname)
//    .filter(function(file) {
//        return (file.indexOf(".") !== 0) && (file !== "index.js");
//    })
//    .forEach(function(file) {
//        var model = sequelize.import(path.join(__dirname, file));
//        db[model.name] = model;
//    });
 
//Object.keys(db).forEach(function(modelName) {
//    if ("associate" in db[modelName]) {
//        db[modelName].associate(db);
//    }
//});
  
db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Load models without dependencies
db.researchers = require('./researcher.js')(sequelize, Sequelize);
db.events = require('./event.js')(sequelize, Sequelize);
db.activities = require('./activity.js')(sequelize, Sequelize);

//Load models that have relations
db.interviews = require('./interview.js')(sequelize, Sequelize);
db.schedules = require('./schedule.js')(sequelize, Sequelize);
db.weeks = require('./week.js')(sequelize, Sequelize);
db.days = require('./day.js')(sequelize, Sequelize);
db.activity_punctuations = require('./activity_punctuation')(sequelize, Sequelize);
db.hours = require('./hour.js')(sequelize, Sequelize);
db.questions = require('./question.js')(sequelize, Sequelize);
db.results = require('./result.js')(sequelize, Sequelize);

//Relations in Cascade
db.researchers.hasMany(db.interviews);
db.interviews.belongsTo(db.researchers);
db.interviews.hasOne(db.schedules);
db.schedules.belongsTo(db.interviews);
db.schedules.hasMany(db.weeks);
db.weeks.belongsTo(db.schedules);
db.weeks.hasMany(db.days);
db.days.belongsTo(db.weeks);
db.days.hasMany(db.hours);
db.hours.belongsTo(db.days);
db.hours.belongsTo(db.activities);
db.hours.belongsTo(db.questions);

//Acitivy relations
db.activities.hasMany(db.hours);
db.activities.hasMany(db.activity_punctuations);
db.activity_punctuations.belongsTo(db.activities);

//Questions relations
db.questions.hasMany(db.hours);
db.questions.belongsTo(db.interviews);
db.questions.belongsTo(db.events);

//Results relations
db.interviews.hasOne(db.results);
db.results.belongsTo(db.interviews);
db.hours.hasOne(db.results);
db.results.belongsTo(db.hours);

module.exports = db;