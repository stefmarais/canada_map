
var locations = {
    vancouver: { latlng: [-123.11835294756537, 49.25619156242101], zoom: 10.752819921822251 },
    calgary: { latlng: [-114.1269176328833, 51.03053920381015], zoom: 9.071392325723814 },
    ottawa: { latlng: [-75.80573792271713, 45.25457139119163], zoom: 8.537250592961694 },
    toronto: { latlng: [-79.38773380521263, 43.718600135254945] , zoom: 9.674891131471975},
    quebec: { latlng: [-72.07167061927993, 54.61701916553747], zoom: 3.3519403746636565 }
}

function drawMap(mapId){
mapboxgl.accessToken = 'pk.eyJ1Ijoic3RlZm1hcmFpcyIsImEiOiJjanFuY3N0bm8wODduNDlwNm13b2Mwa285In0.xhZDVote-OVteRDi4gYQMw';
map = new mapboxgl.Map({
    container: 'canada_map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-95.84039312212701, 58.28629860675238],
    zoom: 2.8708899014466396
});

map.on('load', function () {

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());

    for (var city in locations) {
        map.addSource(city, {
            type: 'geojson',
            data: './data/geo/' + city + '.geojson'
        });

        map.addLayer({
            "id": city + "Layer",
            "type": "fill",
            "source": city,
            "layout": {
                'visibility': 'none'
            },
            "paint": {
                "fill-color": "red",
                "fill-opacity": 0.2
            },
            // "filter": ["==", "$type", "Polygon"]
        });
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
        //.setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        //.setHTML('<h3>'+name+'</h3><p>Something</p>'))
        .addTo(map);

    /*popup
        .setLngLat(locations[name].latlng)
        .setHTML('<h1>Hello ' + name.toUpperCase() + '!</h1><p>Some other text</p>')
        .addTo(map);
    map.panTo(locations.latlng);*/
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
    for (var city in locations) {
        map.setLayoutProperty(city + 'Layer', 'visibility', 'none');
    }
    map.setLayoutProperty(name + 'Layer', 'visibility', 'visible');

    popup
        .setLngLat(locations[name].latlng)
        .setHTML('<h1>Popup Content!</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>')
        .addTo(map);
    //map.panTo(locations.latlng);
    map.flyTo({
        center: locations[name].latlng,
        zoom: locations[name].zoom
    });
}
