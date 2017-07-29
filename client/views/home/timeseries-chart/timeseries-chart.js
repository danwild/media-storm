import Highcharts from 'highcharts';
import moment from 'moment';


Template.timeseriesChart.onRendered(function(){

	// init
	TimeSeriesChart.init();

});

Template.timeseriesChart.events({

	"click #timeSeriesSlider": function(){
		Session.set("targetQuakeId", null);
	}
});


TimeSeriesChart = {

	chart: null,

	init: function(){

		var quakesBig = Helpers.quakeBigTimeSeries();
		var quakesSmall = Helpers.quakeSmallTimeSeries();

		console.log(quakesBig);

		TimeSeriesChart.chart = Highcharts.chart('timeSeriesChart', {
			chart: {
				type: 'scatter'
			},

			tooltip: {
				enabled: false
			},

			title: {
				text: ''
			},
			subtitle: {
				text: 'Earthquakes in Australia since 2012'
			},
			xAxis: {
				title: {
					enabled: true,
					text: 'Date'
				},
				startOnTick: true,
				endOnTick: true,
				showLastLabel: true,
				labels: {
					format: '{value:%d/%m/%Y}'
				},
				tickPixelInterval: 150,

				plotLines: [{
					id: 'timeSlider',
					color: 'red', // Color value
					dashStyle: 'solid', // Style of the plot line. Default to solid
					value: 1401840000000, // Value of where the line will appear
					width: 2 // Width of the line
				}]


			},
			yAxis: [
				{
					min: 3,
					max: 6,
					title: {
						text: ''
					},
					plotBands: [
						{
							from: 4.5,
							to: 7,
							color: 'rgba(255, 105, 97, 0.2)',
							label: {
								text: 'Danger Zone',
								style: {
									color: '#666'
								}
							}
						}
					]
				}
			],
			plotOptions: {

				series: {

					states: {
						hover: {
							enabled: false
						}
					},

					point: {
						events: {
							//mouseOver: function(e){
							//	if(!Session.get("targetQuakeId") && e.target && e.target.category){
							//		var quakeId = Helpers.getQuakeByTime(moment.utc(e.target.category).toISOString());
							//		if(quakeId){
							//			TimeSeriesChart.setTimeSlider(e.target.clientX);
							//		}
							//	}
							//}
						}
					}
				},

				scatter: {

					events: {

						click: function(e){

							var quakeId = Helpers.getQuakeByTime(moment.utc(e.point.category).toISOString());
							if(quakeId){

								if(!Session.equals("targetQuakeId", quakeId)){

									var chart = $("#timeSeriesChart").highcharts();

									chart.xAxis[0].removePlotLine('timeSlider');
									chart.xAxis[0].addPlotLine({
										id: 'timeSlider',
										color: 'red', // Color value
										dashStyle: 'solid', // Style of the plot line. Default to solid
										value: e.point.category, // Value of where the line will appear
										width: 2 // Width of the line
									});

									EarthquakeHelper.setTarget(quakeId);
									return;
								}

								EarthquakeHelper.setTarget(null);

							}
						}

					},

					marker: {
						radius: 7,
						states: {
							hover: {
								enabled: true,
								lineColor: 'rgb(100,100,100)'
							}
						}
					},
					states: {
						hover: {
							marker: {
								enabled: false
							}
						}
					},
					tooltip: {
						//headerFormat: '<b>{series.name}</b><br>',
						//pointFormat: '{point.x:%d/%m/%Y}, Magnitude: {point.y}'
					}
				}
			},
			series: [
				{
					name: 'Major Earthquakes',
					color: 'rgba(223, 83, 83, .5)',
					data: quakesBig
				},

				{
					name: 'Earthquakes',
					color: 'rgba(245, 127, 23, .5)',
					data: quakesSmall
				}
			]
		});

	}

};