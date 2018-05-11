module.exports = function(app) {
   var eventController = require('../controllers/event.js');
   
   //Create a new event
   //app.post('/event', eventController.create); //no need

   //Retrieve all events
   app.get('/events', eventController.findAll);

   //Retrieve a single event with event id
   app.get('/events/:eventId', eventController.findOne);

   //Update an event with event id
   //app.put('/events/:eventId', eventController.update); //no need

   //Delete an event with event id
   //app.delete('/events/:eventId', eventController.delete); //no need 
}