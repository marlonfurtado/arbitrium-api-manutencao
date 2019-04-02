module.exports = function(app) {
    var reportController = require('../controllers/report.js');

    // Create a new result
    //app.post('/result', resultController.create); //No need

    //Retrieve all results
    app.get('/report', reportController.findAll);

    // Recalculate all results
    //app.get('/result/interview/:interviewId', resultController.findOne); //No need

    // Retrive a single result with result id
    // app.get('/result/:resultId', resultController.findOne); //No need

    // Update an result with result id
    //app.put('/result/:resultId', resultController.update); //No need

    // Delete an result with result id
    //app.delete('/result/:resultId', resultController.delete); //No need
}
