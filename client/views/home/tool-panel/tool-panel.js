


Session.set("foo", 1);

Template.toolPanel.events({

	"click .toolPanel": function(e){

        Meteor.call('getTwitter', function(err, data) {

		});
	}

});


Template.toolPanel.helpers({

	example: function(){



	}

});