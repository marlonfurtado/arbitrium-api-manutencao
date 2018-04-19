module.exports = function(app) {
    var interviewController = require('../controllers/interview.js');

    // Create a new activity
    app.post('/interviews', interviewController.create);

    // Retrieve all activities
    //app.get('/interviews', interviewController.findAll); //No need

    // Retrive a single activity with activity id
    //app.get('/interviews/:interviewId', interviewController.findOne); //No need

    // Update an activity with activity id
    //app.put('/interviews/:interviewId', interviewController.update); //No need

    // Delete an activity with activity id
    //app.delete('/interviews/:interviewId', interviewController.delete); //No need
}