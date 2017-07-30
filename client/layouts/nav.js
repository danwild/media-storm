Template.nav.events({

	/*
	This whole file is a hack because map and other components
	using the onRender function to init break on routing
	 */
	"click .home-button": function(){
		window.location = window.origin;
	},

	"click .about-button": function(){
		window.location = window.origin + '/about';
	}

});