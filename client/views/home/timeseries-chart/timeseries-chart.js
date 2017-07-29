import Highcharts from 'highcharts';

Template.timeseriesChart.onRendered(function(){

	// init
	TimeSeriesChart.init();

});

TimeSeriesChart = {

	chart: null,



	init: function(){

		var series = Helpers.quakeTimeSeries();

		console.log(series);

		Highcharts.setOptions({
			lang: {
				resetZoom: "Clear Zoom"
			}
		});

		Highcharts.chart('timeSeriesChart', {

			chart: {
				type: 'spline'
			},

			title: {
				text: ''
			},

			subtitle: {
				text: ''
			},

			xAxis: {
				type: 'datetime',
				dateTimeLabelFormats: { // don't display the dummy year
					month: '%e. %b',
					year: '%b'
				},
				title: {
					text: 'Date'
				}
			},
			yAxis: {
				title: {
					text: 'Snow depth (m)'
				},
				min: 0
			},
			tooltip: {
				headerFormat: '<b>{series.name}</b><br>',
				pointFormat: 'Magnitude: {point.y:.2f}' //{point.x:%e. %b}
			},

			plotOptions: {
				spline: {
					marker: {
						enabled: true
					}
				}
			},

			series: [{
				name: 'Earthquake Magnitude',
				data: series
			}]
		});


	}

};