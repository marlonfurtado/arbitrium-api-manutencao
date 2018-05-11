module.exports = function(app) {
    var activityController = require('../controllers/activity.js');

    // Create a new activity
    //app.post('/activity', activityController.create); //No need

    // Retrieve all activities
    app.get('/activities', activityController.findAll);

    // Retrive a single activity with activity id
    app.get('/activities/:activityId', activityController.findOne);

    // Update an activity with activity id
    //app.put('/activities/:activityId', activityController.update); //No need

    // Delete an activity with activity id
    //app.delete('/activities/:activityId', activityController.delete); //No need
}
