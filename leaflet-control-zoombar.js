L.Control.ZoomBar = L.Control.extend({
    options: {
        // zoom settings: latlngzoom or a bounds
        homeBounds: null,
        homeLatLng: null,
        homeZoom: 1,
        // the button text/html and tooltips
        zoomInText: '+',
        zoomInTitle: 'Zoom in',
        zoomOutText: '-',
        zoomOutTitle: 'Zoom out',
        zoomHomeText: '&#927;',
        zoomHomeTitle: 'Zoom home',
        // general settings
        position: 'topright',
    },

    initialize: function(options) {
        if (! options.homeBounds && ! options.homeLatLng ) throw "ZoomBar missing required homeBounds or homeLatLng";
        L.Util.setOptions(this, options);
    },

    onAdd: function (map) {
        this.container = L.DomUtil.create('div', 'leaflet-control-zoom leaflet-bar');
        this._zoomInButton = this._createButton(this.options.zoomInText, this.options.zoomInTitle, 'leaflet-control-zoom-in', this.container, this._zoomIn);
        this._zoomHomeButton = this._createButton(this.options.zoomHomeText, this.options.zoomHomeTitle, 'leaflet-control-zoom-home', this.container, this._zoomHome);
        this._zoomOutButton  = this._createButton(this.options.zoomOutText, this.options.zoomOutTitle, 'leaflet-control-zoom-out',  this.container, this._zoomOut);

        this._updateDisabled();
        map.on('zoomend zoomlevelschange', this._updateDisabled, this);

        return this.container;
    },

    onRemove: function (map) {
        map.off('zoomend zoomlevelschange', this._updateDisabled, this);
    },

    _zoomIn: function (e) {
        this._map.zoomIn(e.shiftKey ? 3 : 1);
    },

    _zoomOut: function (e) {
        this._map.zoomOut(e.shiftKey ? 3 : 1);
    },

    _zoomHome: function () {
        if (this.options.homeBounds) {
            this._map.fitBounds(this.options.homeBounds);
        }
        else if (this.options.homeLatLng) {
            this._map.setView(this.options.homeLatLng,this.options.homeZoom);
        }
    },

    _createButton: function (html, title, className, container, fn) {
        var link = L.DomUtil.create('a', className, container);
        link.innerHTML = html;
        link.href = '#';
        link.title = title;

        L.DomEvent
            .on(link, 'mousedown dblclick', L.DomEvent.stopPropagation)
            .on(link, 'click', L.DomEvent.stop)
            .on(link, 'click', fn, this)
            .on(link, 'click', this._refocusOnMap, this);

        return link;
    },

    _updateDisabled: function () {
        var map = this._map,
            className = 'leaflet-disabled';

        L.DomUtil.removeClass(this._zoomInButton, className);
        L.DomUtil.removeClass(this._zoomOutButton, className);

        if (map._zoom === map.getMinZoom()) {
            L.DomUtil.addClass(this._zoomOutButton, className);
        }
        if (map._zoom === map.getMaxZoom()) {
            L.DomUtil.addClass(this._zoomInButton, className);
        }
    }
});