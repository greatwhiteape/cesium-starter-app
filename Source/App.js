//ORIGINAL
//var viewer = new Cesium.Viewer('cesiumContainer');
var viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider : new Cesium.ArcGisMapServerImageryProvider({
        url : '//server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer'
    }),
    baseLayerPicker : false
});
// ORIGINAL
var imageryLayers = viewer.imageryLayers;
var baseLayers = viewer.baseLayers;

portland = {lon:-70.2667, lat:43.6667};
gom = {
	north: 49,
	east: -60,
	south: 40,
	west: -77,
	center: {
		lon: -67.601318,
		lat: 43.162018
	}
}
gomRect = Cesium.Rectangle.fromDegrees(gom.west,gom.south,gom.east,gom.north);

buoys = {
	'A01': {
		name: "A01",
		location: "Massachusetts Bay",
		lat: 42.52283333333333,
		lon: -70.56533333333333
	},
	'B01': {
		name: "B01",
		location: "Western Maine Shelf",
		lat: 43.18083333333333,
		lon: -70.42783333333334
	},
	'E01': {
		name: "E01",
		location: "Central Maine Shelf",
		lat: 43.715666666666664,
		lon: -69.35516666666666
	},
	'F01': {
		name: "F01",
		location: "Penobscot Bay",
		lat: 44.0555,
		lon: -68.99816666666666
	},
	'I01': {
		name: "I01",
		location: "Eastern Maine Shelf",
		lat: 44.10616666666667,
		lon: -68.1095
	},
	'M01': {
		name: "M01",
		location: "Jordan Basin",
		lat: 43.49066666666667,
		lon: -67.87933333333334
	},
	'N01': {
		name: "N01",
		location: "Northeast Channel",
		lat: 42.32566666666666,
		lon: -65.91133333333333
	}
	};
var wms_time = '2015-07-23T09:00:00Z';

var erd_url = "http://upwell.pfeg.noaa.gov/erddap";
var datasetID = 'jplMURSST';
var wms_time_stride = 30;
// In the future can get this from erd_info_url, i.e. the full list of layer variables.
var erd_data_layers = [];
var erd_var_name = 'analysed_sst';
var wms_url = erd_url + '/wms/' + datasetID + '/request?';

// Add a WMS imagery layer - OpenWeather Clouds
imageryLayers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
    //url : 'proxy/'+wms_url,
	url: wms_url,
	proxy: new Cesium.DefaultProxy('/proxy/'),
	layers : 'MURSST',
	parameters : {
		exceptions:'INIMAGE',
		version:'1.3.0',
		srs:'EPSG:4326',
		layers: datasetID + ':' + erd_var_name,
		time: wms_time,
		elevation: '0.0',
		transparent:'true',
		bgcolor:'0xAFCDE7',
		format:'image/png'
	}
}));

// Add a WMS imagery layer - MURSST
new Cesium.WebMapServiceImageryProvider({
		url : '//mesonet.agron.iastate.edu/cgi-bin/wms/goes/conus_ir.cgi?',
		layers : 'goes_conus_ir',
		credit : 'Infrared data courtesy Iowa Environmental Mesonet',
		parameters : {
				transparent : 'true',
				format : 'image/png'
		},
		proxy : new Cesium.DefaultProxy('/proxy/')
});
// Start off looking at Gulf of Maine.
setTimeout(function() {
	viewer.camera.flyTo({
		//ORIGINAL
		//destination: Cesium.Rectangle.fromDegrees(114.591, -45.837, 148.970, -5.730)
		destination: gomRect
	});
},5000);
