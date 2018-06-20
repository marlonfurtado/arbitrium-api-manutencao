module.exports = function(app) {
    var weekController = require('../controllers/week.js');

    // Create a new week
    app.post('/week', weekController.create);

    // Retrieve all weeks
    //app.get('/weeks', weekController.findAll);

    // Retrive a single week with week id
    //app.get('/week/:weekId', weekController.findOne);

    app.get('/week/last-week/:interviewId', weekController.findLastWeek);

    // Update an week with week id
    //app.put('/week/:weekId', weekController.update); //No need

    // Delete an week with week id
    //app.delete('/week/:weekId', weekController.delete); //No need
}