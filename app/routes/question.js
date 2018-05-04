module.exports = function(app){
    var questionController = require('../controllers/question.js');

    //need to create the PUT of Questions:
    //Update an questions with question ID
    app.put('/questions/:questionId', questionController.update);

    // Create a new question
    app.post('/question', questionController.create);

    // Retrieve all questioons

    // Retrive a single question

    // Delete a question
}
