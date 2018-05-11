module.exports = function(app){
    var questionController = require('../controllers/question.js');

    //need to create the PUT of Questions:
    //Update an questions with question ID
    app.put('/questions/:questionId', questionController.update);
}