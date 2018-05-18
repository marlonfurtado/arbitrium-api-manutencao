module.exports = function(app) {
    var resultController = require('../controllers/result.js');

    // Create a new result
    //app.post('/result', resultController.create); //No need

    // Retrieve all results
    //app.get('/results', resultController.findAll);

    // Recalculate all results
    app.get('/result/interview/:interviewId', resultController.findOne);

    // Retrive a single result with result id
    // app.get('/result/:resultId', resultController.findOne); //No need

    // Update an result with result id
    //app.put('/result/:resultId', resultController.update); //No need

    // Delete an result with result id
    //app.delete('/result/:resultId', resultController.delete); //No need
}
