
EarthquakeMapLayers = {

	quakeAnimationLayer: null,
	bigEarthQuakesLayer: null,
	smallEarthQuakesLayer: null,

	animateQuake: function(id){
		this.quakeAnimationLayer.animatePoint(id);
	},

	/**
	 * Adds an canvas layer as leaflet map layer that can be animated later
	 */
	initQuakeAnimationLayer: function () {
		var earthQuakeLayer = function(){

			this.animatePoint = function(id){
				this.targetQuake = Helpers.getQuake(id);
				this.needRedraw();
			};

			this.onDrawLayer = function (info){

				var targetQuake = this.targetQuake;

				if(!targetQuake) return; // don't draw on init

				var ctx = info.canvas.getContext('2d');
				ctx.clearRect(0, 0, info.canvas.width, info.canvas.height);
				ctx.fillStyle = "rgba(223, 83, 83, .8)";

				//for (var i = 0; i < data.length; i++) {
					var d = targetQuake;
					if (info.bounds.contains([d['Latitude'], d['Longitude']])) {
						var dot = info.layer._map.latLngToContainerPoint([d['Latitude'], d['Longitude']]);
						ctx.beginPath();
						ctx.arc(dot.x, dot.y, 5, 0, Math.PI * 2);
						ctx.fill();
						ctx.closePath();
					}
				//}
			}
		};
		earthQuakeLayer.prototype = new L.CanvasLayer(); // -- setup prototype
		this.quakeAnimationLayer = new earthQuakeLayer();
		MapHelper.map.addLayer(this.quakeAnimationLayer);
	},

	/**
	 * Adds an canvas layer as leaflet overlay
	 */
	initBigEarthQuakesLayer: function () {
		var earthQuakeLayer = function(){
			this.data = Helpers.bigEarthQuakes();
			this.onDrawLayer = function (info){
				var data = this.data;
				var ctx = info.canvas.getContext('2d');
				ctx.clearRect(0, 0, info.canvas.width, info.canvas.height);
				ctx.fillStyle = "rgba(223, 83, 83, .8)";
				for (var i = 0; i < data.length; i++) {
					var d = data[i];
					if (info.bounds.contains([d['Latitude'], d['Longitude']])) {
						var dot = info.layer._map.latLngToContainerPoint([d['Latitude'], d['Longitude']]);
						ctx.beginPath();
						ctx.arc(dot.x, dot.y, 5, 0, Math.PI * 2);
						ctx.fill();
						ctx.closePath();
					}
				}
			}
		};
		earthQuakeLayer.prototype = new L.CanvasLayer(); // -- setup prototype
		this.bigEarthQuakesLayer = new earthQuakeLayer();
		MapHelper.layerManager.addOverlay(this.bigEarthQuakesLayer, "major earthquakes");
	},

	/**
	 * Adds an canvas layer as leaflet overlay
	 */
	initSmallEarthQuakesLayer: function () {
		var earthQuakeLayer = function(){
			this.data = Helpers.smallEarthQuakes();
			this.onDrawLayer = function (info){
				var data = this.data;
				var ctx = info.canvas.getContext('2d');
				ctx.clearRect(0, 0, info.canvas.width, info.canvas.height);
				ctx.fillStyle = "rgba(245, 127, 23, .2)";
				for (var i = 0; i < data.length; i++) {
					var d = data[i];
					if (info.bounds.contains([d['Latitude'], d['Longitude']])) {
						var dot = info.layer._map.latLngToContainerPoint([d['Latitude'], d['Longitude']]);
						ctx.beginPath();
						ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
						ctx.fill();
						ctx.closePath();
					}
				}
			}
		};
		earthQuakeLayer.prototype = new L.CanvasLayer(); // -- setup prototype
		this.bigEarthQuakesLayer = new earthQuakeLayer();
		MapHelper.layerManager.addOverlay(this.bigEarthQuakesLayer, "minor earthquakes");
	}

};