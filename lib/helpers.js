var config = require('/config.json');
var quakes = require('/earthquakes.json');

Helpers = {

	config: config,
	quakes: quakes,

	error: function (error) {
		sAlert.error(error.message, error.options);
	},
	warning: function (warning) {
		sAlert.warning(warning.message, warning.options);
	},
	info: function (info) {
		sAlert.info(info.message, info.options);
	},
	success: function (success) {
		sAlert.success(success.message, success.options);
	},
	clearAlert: function () {
		sAlert.closeAll();
	}

};