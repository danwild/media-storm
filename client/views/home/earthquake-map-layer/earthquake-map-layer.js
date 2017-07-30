
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

				// don't draw if out of view?
				if (info.bounds.contains([targetQuake['Latitude'], targetQuake['Longitude']])) {

					var dot = info.layer._map.latLngToContainerPoint([targetQuake['Latitude'], targetQuake['Longitude']]);
					ctx.arc(dot.x, dot.y, 5, 0, Math.PI * 2);
					var canvasWidth = info.canvas.width;
					var canvasHeight = info.canvas.height;
					var angle = 0;

					var requestAnimationFrame = window.requestAnimationFrame ||
						window.mozRequestAnimationFrame ||
						window.webkitRequestAnimationFrame ||
						window.msRequestAnimationFrame;

					function drawCircle() {

						ctx.clearRect(0, 0, canvasWidth, canvasHeight);

						// color in the background
						ctx.fillStyle = "rgba(163, 54, 52, .6)";

						// draw the circle
						ctx.beginPath();
						var radius = 15 + 10 * Math.abs(Math.cos(angle));
						ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
						ctx.closePath();

						// color in the circle
						ctx.fillStyle = "rgba(163, 54, 52, .6)";
						ctx.fill();
						angle += Math.PI / 64;

						requestAnimationFrame(drawCircle);
					}

					drawCircle();
				}
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