# Interactive map of cities and provinces in Canada

Mapbox plugin with custom geojson layers for Calgary, Otawa, Toronto, Vancouver and Quebec.

Once user clicks on <a> element, map flies to selected location, zooms to location height and popup appears.

Selectable areas are defined in the global locations object which is contains the following items:
**province**: ID key - Concatenated and lowercase, e.g. britishcolombia
**name**: Display name, e.g. "British Colombia"
**latlng**: Latitude and Longitude coordinates of location marker, e.g. [-123.11835294756537, 49.25619156242101]
**center**: Center of fly_to function, calculated center of province, e.g. [ -128.63951425047372, 54.579362131248814]
**zoom**: Zoom level set in fly_to function, e.g. 3.8595318746930634


Working link:
http://stefmarais.com/canada_map/
