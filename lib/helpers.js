var config = require('/config.json');
var quakes = require('/earthquakes.json');

import moment from 'moment';

Helpers = {

	config: config,
	quakes: quakes,

	quakeBigTimeSeries: function(){

		var magLimit = config.magLimit;
		var bigQuakes = _.reject(this.quakes, function(quake){
			return quake.Magnitude <= magLimit;
		});

		return _.map(bigQuakes, function(quake){
			return [+moment.utc(quake['UTC Date']), quake['Magnitude']];
		});
	},

	quakeSmallTimeSeries: function(){

		var magLimit = config.magLimit;
		var smallQuakes = _.reject(this.quakes, function(quake){
			return quake.Magnitude >= magLimit;
		});

		return _.map(smallQuakes, function(quake){
			return [+moment.utc(quake['UTC Date']), quake['Magnitude']];
		});
	},

	getQuakeByTime: function(timeISO){

		var magLimit = config.magLimit;
		var bigQuakes = _.reject(this.quakes, function(quake){
			return quake.Magnitude <= magLimit;
		});

		for(var i = 0; i < bigQuakes.length; i++){
			if(moment.utc(bigQuakes[i]['UTC Date'], 'YYYY-MM-DD').isSame(moment.utc(timeISO), 'day')){
				return bigQuakes[i]['EVENT ID'];
			}
		}
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