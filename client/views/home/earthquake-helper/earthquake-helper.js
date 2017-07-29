Session.set("targetQuakeId", null);

EarthquakeHelper = {

	setTarget: function(id){

		Helpers.success({ message: "targetQuakeId updated: "+ id });

		Session.set("targetQuakeId", id);

		// TODO
		// do some vis on the map

		// query server for twitter data

		// vis tweets on map, show some top tweets as notifications
	}

};