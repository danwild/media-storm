
EarthquakeMapLayer = {

	bigEarthQuakesLayer: null,
	smallEarthQuakesLayer: null,

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