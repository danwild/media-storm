var config = require('/config.json');
var quakes = require('/earthquakes.json');
import moment from 'moment';

Helpers = {

	config: config,
	quakes: quakes,

	quakeTimeSeries: function(){
		return _.map(this.quakes, function(quake){
			return [new Date(moment(quake['UTC Date'])), quake['Magnitude']];
		});
	},

	normalizedTimeScale: function(){

		var times = [];
		var timeCount = this.quakes.length;
		var startDate = moment(this.quakes[0]['UTC Date']);

		var endDate = moment(this.quakes[timeCount-1]['UTC Date']);

	},

	quakeIds: function(){
		return _.map(this.quakes, function(quake){
			return quake['UTC Date'];
		});
	},

	quakeMagnitudes: function(){
		return _.map(this.quakes, function(quake){
			return quake['Magnitude'];
		});
	},

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