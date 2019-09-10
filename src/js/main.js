
var locations = {
    britishcolumbia: {name:'British Columbia', latlng: [-123.11835294756537, 49.25619156242101], center: [ -128.63951425047372, 54.579362131248814], zoom: 3.8595318746930634, content: "This is some more example text" },
    newbrunswick: {name: 'New Brunswick', latlng: [  -63.605836,44.651053], center: [-66.89250346143456, 46.36692374145568], zoom: 5.917380821106469, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."  },
    newfoundland: {name: 'Newfoundland and Labrador', latlng: [  -67.330596, 50.307150,], center: [ -60.941964537872764, 54.12616057451703], zoom: 3.6774807964000855, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."  },
    novascotia: {name: 'Nova Scotia', latlng: [ -63.617512,44.648244], center: [-63.32643363979838, 45.33389042715629] , zoom: 5.736525704589842, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    princeedwardisland: {name: 'Prince Edward Island', latlng: [-63.605836,44.651053], center: [-63.47600972913256,  45.78872534156025], zoom: 6.339104587489569, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."  },
    ontario: {name: 'Ontario', latlng: [ -77.468735, 44.572710], center: [-84.73043093069788, 49.90600931217975], zoom: 3.641541874840572, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."  },
    quebec: {name: 'Quebec', latlng: [-72.07167061927993, 54.61701916553747], center: [-72.07167061927993, 54.61701916553747], zoom: 3.3519403746636565, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."  },
    /*Not whole province*/alberta: { latlng: [-114.1269176328833, 51.03053920381015], center: [ -114.05129791809338, 52.26771084802127], zoom: 5.889415802952634, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."  }
}

function drawMap(mapId){
mapboxgl.accessToken = 'pk.eyJ1Ijoic3RlZm1hcmFpcyIsImEiOiJjanFuY3N0bm8wODduNDlwNm13b2Mwa285In0.xhZDVote-OVteRDi4gYQMw';
map = new mapboxgl.Map({
    container: mapId,
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [-95.84039312212701, 58.28629860675238],
    zoom: 2.8708899014466396
});
//map.scrollZoom.disable();
map.on('load', function () {

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());
    
    map.addSource('canada', {
        type: 'geojson',
        data: './src/geo/canada.geojson'
    });

    for (var point in locations){

        if(point  != 'alberta'){
            map.addLayer({
                "id": point+"Layer",
                "type": "fill",
                "source": "canada",
                "layout": {
                    'visibility': 'none'
                },
                "paint": {
                    "fill-color": "red",
                    "fill-opacity": 0.2
                },
                "filter": ["==", "name", locations[point].name]
            });
        }
        else if (point == 'alberta'){
            map.addSource('alberta',{
                type: 'geojson',
                data: './src/geo/calgary.geojson'
            });
            map.addLayer({
                "id": point+"Layer",
                "type": "fill",
                "source": "alberta",
                "layout": {
                    'visibility': 'none'
                },
                "paint": {
                    "fill-color": "red",
                    "fill-opacity": 0.2
                },
                //"filter": ["==", "name", locations[point].name]
            });
        }
    }
    

});
}

var popup = new mapboxgl.Popup({
    closeOnClick: false,
    offset: [0, -6]
})
function addMarker(name) {

    map.setLayoutProperty('quebecLayer', 'visibility', 'none');
    removeMarkers();
    var el = document.createElement('div');

    el.className = 'location_marker';
    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
        .setLngLat(locations[name].latlng)
        .addTo(map);
}

function removeMarkers() {
    var markers = document.getElementsByClassName("location_marker");
    for (let marker of markers) {
        marker.style.display = "none";
    }
}

function showLayer(name) {
    removeMarkers();
    popup.remove();
    addMarker(name);
    for (var point in locations) {
        map.setLayoutProperty(point + 'Layer', 'visibility', 'none');
    }
    map.setLayoutProperty(name + 'Layer', 'visibility', 'visible');

    popup
        .setLngLat(locations[name].latlng)
        .setHTML('<h3>Popup Content!</h3><p>'+locations[name].content+'</p>')
        .addTo(map);
    //map.panTo(locations.latlng);
    map.flyTo({
        center: locations[name].center,
        zoom: locations[name].zoom
    });
}
drawMap('map_div');
