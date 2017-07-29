Session.set("foo", 1);

Template.toolPanel.events({

	"click .toolPanel": function(e){


		Session.set("foo", "baaaaaaar");
	}

});


Template.toolPanel.helpers({

	example: function(){

		//return Helpers.quakes[Session.get("foo")].Magnitude;
		return 'testing branch'

		//return Session.get("foo");
	}

});
