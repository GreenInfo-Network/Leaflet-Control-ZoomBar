# Leaflet-Control-ZoomBar

A Leaflet control for adding a zoom bar offering a Home button in addition to the + - options.

https://github.com/GreenInfo-Network/Leaflet-Control-ZoomBar

https://greeninfo-network.github.io/Leaflet-Control-ZoomBar/


# Usage Example

```
<script type="text/javascript" src="leaflet-control-zoombar.js"></script>
<link rel="stylesheet" href="leaflet-control-zoombar.css" />


new L.Control.ZoomBar({
    // for the home button, give a latlng and a zoom or a bounds
    // homeBounds: [[37.64, -122.64], [37.92, -122.19]],
    homeLatLng: [37.7833,-122.4167],
    homeZoom: 12,
    // give custom HTML for the home button
    zoomHomeText: '<img src="https://upload.wikimedia.org/wikipedia/commons/e/e6/Home_Icon.svg" style="height: 20px; width: 20px; margin-top: 4px;" />',
}).addTo(map);
```


# Options

* `homeBounds`
  * `L.LatLngBounds` object or a `[[swlat,swlng], [nelat,nelng]]` literal
  * When the Home button is clicked, the map will be zoomed to this view
  * Use either `homeBounds` or `homeLatLng` and `homeZoom`, but not both
* `homeLatLng` and `homeZoom` together
  * `homeLatLng` is a `L.LatLng` object or `[lat, lng]` literal
  * `homeZoom` is a zoom number
  * When the Home button is clicked, the map will be zoomed to this view
  * Use either `homeBounds` or `homeLatLng` and `homeZoom`, but not both
* `zoomInText` `zoomOutText` `zoomHomeText`
  * These set the HTML for the three buttons, allowing you to replace icons, use images, etc.
* `zoomInTitle` `zoomOutTitle` `zoomHomeTitle`
  * These set the tooltipsd for the three buttons.
