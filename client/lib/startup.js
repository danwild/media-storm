
// kick off our pkg imports
import '/imports/startup/client';
import '/imports/startup/both';

// by default BlazeLayout creates it's own container (#__blaze-root), we'll use body
BlazeLayout.setRoot('body');

// store visual elems
DisplayedData = new Mongo.Collection(null);

// other init stuff, should probs go in startup conf..
Meteor.startup(function(){

	sAlert.config({
		effect: 'slide',
		position: 'top',
		timeout: 10000,
		html: true,
		offset: 320
	});

});