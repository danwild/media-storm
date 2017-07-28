
Template.map.onRendered(function () {

	// avoid triggering re-render on add/rm
	if(MapHelper.map) return;

	MapHelper.mapConfig = Helpers.config.map;
	MapHelper.setupLayers();

	MapHelper.map = L.map('map', {
		center: MapHelper.mapConfig.startCenter,
		zoom: MapHelper.mapConfig.startZoom,
		layers: [] // see comment below
	});

	// seeing strange conflict in leaflet when adding L.control.layers and layers array on
	// map init, add separately and we have no problem..
	Meteor.setTimeout(function(){
		MapHelper.map.addLayer(MapHelper.baseMaps['canvas']);
	}, 0);

	MapHelper.layerManager.addTo(MapHelper.map);
	L.control.mousePosition({
		emptyString: " -- : -- ",
		prefix: "<strong>LatLng:</strong>"
	}).addTo(MapHelper.map);

	L.control.scale({ imperial: false }).addTo(MapHelper.map);

	MapHelper.setupLoading();

});

MapHelper = {

	map: null,
	mapConfig: null,
	baseMaps: null,
	overlays: {},
	layerManager: null,
	attributionControl: null,


	// handle leaflet-loading issue #26
	loadingCount: 0,

	loadingStart: function(){
		this.map.fireEvent("dataloading");
		this.loadingCount++;
	},

	loadingEnd: function(){
		this.loadingCount--;
		if(this.loadingCount < 1) this.map.fireEvent("dataload");
	},

	setupLoading: function(){

		var loadingControl = L.Control.loading({
			separate: true
		});

		MapHelper.map.addControl(loadingControl);
	},

	createBaseLayers: function() {

		var basemapConfig = Helpers.config.map.basemaps;
		var baseMaps = {};

		_.each(basemapConfig, function (config) {

			var baseMap;

			if(config.type == "TILE") {
				baseMap = L.tileLayer(config.url, config.options);
			}

			else if (config.type == "WMS") {
				baseMap = L.tileLayer.wms(config.url, config.options);
			}

			baseMaps[config.name] = baseMap;
		});

		return baseMaps;
	},

	setupLayers: function() {

		MapHelper.baseMaps = MapHelper.createBaseLayers();
		MapHelper.layerManager = L.control.layers(MapHelper.baseMaps, null, {
			position: "bottomright",
			collapsed: false,
			autoZIndex: true
		});
	}
};
