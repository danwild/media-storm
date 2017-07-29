


Session.set("foo", 1);

Template.toolPanel.events({

	"click .toolPanel": function(e){

		TwitterHelper.getRequestId();
	}

});


Template.toolPanel.helpers({

	example: function(){



	}

});