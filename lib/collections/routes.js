FlowRouter.route('/', {

	name: 'home',

	action: function () {

		Tracker.autorun(function() {

			// this is how you wait for subs, when we need to
			var ready = true; //FlowRouter.subsReady("example");

			Tracker.nonreactive(function(){

				if(ready){
					BlazeLayout.render("masterlayout", { contentTemplate: "home" });
				}

				else {
					BlazeLayout.render("masterlayout", { contentTemplate: "loadingPage" });
				}

			});
		});

	}
});

FlowRouter.route('/about', {
	path: 'about',
	action: function () {
		BlazeLayout.render("masterlayout", { contentTemplate: "about" });
	}
});

FlowRouter.notFound = {
	action: function() {
		BlazeLayout.render("masterlayout", { contentTemplate: "notfound" });
	}
};
