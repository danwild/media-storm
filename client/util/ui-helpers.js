UI.registerHelper('currentTime', function() {
	return Session.get("currentTime");
});

UI.registerHelper('isRoute', function(route) {
	return route == FlowRouter.getRouteName();
});

UI.registerHelper('targetQuakeId', function() {
	return Session.get("targetQuakeId");
});