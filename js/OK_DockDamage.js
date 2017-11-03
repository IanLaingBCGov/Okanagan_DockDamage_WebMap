/* -----------------------------------------------------------------------------------
   Okanagan Lake Dock Damage
   Developed by GeoBC
   (c) 2017 GeoBC | http://www.geobc.gov.bc.ca  
----------------------------------------------------------------------------------- */

$.urlParam = function(name) {
  var results = new RegExp('[\\?&]' + name + '=([^&#]*)')
      .exec(window.location.href);
  if (!results) {
    return 0;
  }
  return results[1] || 0;
};

$( document ).ready(function() {

  var geomarkId = $.urlParam('geomarkId');
  var map = L.map('map', {
    minZoom: 1,
    maxZoom: 18
  }).setView([49.8, -119.5], 10);
  
/*-----BASE MAPS-----*/

  var provRoadsWM = new L.tileLayer.wms("http://maps.gov.bc.ca/arcserver/services/province/roads_wm/MapServer/WMSServer", {
    	layers: '0',
        format: 'image/png',
        transparent: true,
        attribution: "© 2013-2016 GeoBC, DataBC, The Province of British Columbia"
	}).addTo(map);
  
  var provWebMercatorCache = new L.tileLayer.wms("http://maps.gov.bc.ca/arcserver/services/Province/web_mercator_cache/MapServer/WMSServer", {
      layers: '0',
        format: 'image/png',
        transparent: true,
        attribution: "© 2013-2016 GeoBC, DataBC, The Province of British Columbia"
	});
  
/*-----OVERLAYS-----*/

  var crs84 = new L.Proj.CRS('CRS:84', '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs');
  
  /*-----OKANAGAN LAKE 2017 IMAGERY-----*/
  var OKimagery = new L.tileLayer.wms("http://test.openmaps.gov.bc.ca/lzt/ows?", {
      layers: 'o17',
        format: 'image/png',
        transparent: true,
        attribution: "© 2013-2016 GeoBC, DataBC, The Province of British Columbia"
  }).addTo(map);

  /*-----POINTS OF DIVERSION-----*/  
  /*
  var pointsOfDiversion = new L.tileLayer.wms("https://openmaps.gov.bc.ca/geo/pub/WHSE_WATER_MANAGEMENT.WLS_POD_LICENCE_SP/ows", {
      layers: 'pub:WHSE_WATER_MANAGEMENT.WLS_POD_LICENCE_SP',
        format: 'image/png',
        transparent: true,
        attribution: "© 2013-2016 GeoBC, DataBC, The Province of British Columbia",
      crs:crs84,
      styles: 'Points_of_Diversion'
  }).addTo(map);
  */

  /*-----Layer Control-----*/
  var layerControl = L.control.layers(
    {
    'Roads Base Map': provRoadsWM,
    'Terrain Base Map': provWebMercatorCache
    },
    {
    'Okanagan Lake 2017 Imagery (Scale Dependent)': OKimagery
    },
    {
    collapsed: true  
    }
  ).addTo(map);
 
  /*-----GEOJSON-----*/ 

  /*-----SCALEBAR-----*/
  var scaleControl = L.control.scale(
    {
    imperial: false
    }
  ).addTo(map);
  
  /*-----MT. POLLEY MINE MARKER-----*/
  /*
  var MtPolleyMarker = L.marker([52.513437,-121.596309],
	{
	title: 'Mt. Polley Mine'
	}
  ).addTo(map);
  MtPolleyMarker.bindPopup("Mt. Polley Mine").openPopup();
  */

  /*-----ZOOM-AWARE GEOJSONs-----*/
  /*
  var simpCounter = 0;
  
  map.on('zoomend', function(e) {
    if (map.getZoom() >= 10) {
      if (simpCounter == 0 || simpCounter == 2) {
      getFWAStreamJson("QUES_2O_NET10M.geojson");
      getEMSJson("EMS_Monitoring_Locations_QUES.geojson");
      simpCounter = 1;
      }
    } else if (map.getZoom() <= 9) {
        if (simpCounter == 0 || simpCounter == 1) {
        getFWAStreamJson("FWA_BC_200M.geojson");
        simpCounter = 2;
      }
    }
  });
  */
});

