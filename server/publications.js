
// here we publish a server-side Mongo collection, which can now be accessed via client
// note this is not ideal, we should really only access server collection via server method function
Meteor.publish('example', function(){
	return Example.find();
});