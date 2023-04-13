L.Control.ZoomBar = L.Control.extend({
    initialize: function (options) {
        const settings = Object.assign({
            // zoom settings: latlngzoom or a bounds
            homeBounds: null,
            homeLatLng: null,
            homeZoom: 1,
            // tooltip / ARIA text
            zoomInTitle: 'Zoom in',
            zoomHomeTitle: 'Reset to home',
            zoomOutTitle: 'Zoom out',
            // general settings
            position: 'topright',
        }, options);

        if (! settings.homeBounds && ! settings.homeLatLng) throw "ZoomBar missing required homeBounds or homeLatLng";
        L.Util.setOptions(this, settings);
    },

    onAdd: function (map) {
        this._map = map;
        this._container = L.DomUtil.create('div', 'leaflet-control-zoom leaflet-bar');

        // Zoom In
        this._inbutton = L.DomUtil.create('button', 'leaflet-control-zoom-zoomin', this._container);
        this._inbutton.title = this.options.zoomInTitle;
        this._inbutton.setAttribute('aria-label', this.options.zoomInTitle);
        this._inbutton.innerText = '+';

        L.DomEvent.on(this._inbutton, 'click', () => {
            this.zoomIn();
        });
        L.DomEvent.on(this._inbutton, 'mousedown click dblclick', L.DomEvent.stopPropagation);

        // Zoom Home
        this._homebutton = L.DomUtil.create('button', 'leaflet-control-zoom-zoomhome', this._container);
        this._homebutton.title = this.options.zoomHomeTitle;
        this._homebutton.setAttribute('aria-label', this.options.zoomHomeTitle);

        L.DomEvent.on(this._homebutton, 'click', () => {
            this.zoomHome();
        });
        L.DomEvent.on(this._homebutton, 'mousedown click dblclick', L.DomEvent.stopPropagation);

        // Zoom Out
        this._outbutton = L.DomUtil.create('button', 'leaflet-control-zoom-zoomout', this._container);
        this._outbutton.title = this.options.zoomOutTitle;
        this._outbutton.setAttribute('aria-label', this.options.zoomOutTitle);
        this._outbutton.innerText = '-';

        L.DomEvent.on(this._outbutton, 'click', () => {
            this.zoomOut();
        });
        L.DomEvent.on(this._outbutton, 'mousedown click dblclick', L.DomEvent.stopPropagation);

        // when zoom level changes, disable the +- buttons if we're at max/min zoom
        map.on('zoomend zoomlevelschange', this._updateDisabled, this);
        this._updateDisabled();

        // done!
        return this._container;
    },

    onRemove: function (map) {
        map.off('zoomend zoomlevelschange', this._updateDisabled, this);
    },

    zoomIn: function () {
        this._map.zoomIn(1);
    },

    zoomOut: function () {
        this._map.zoomOut(1);
    },

    zoomHome: function () {
        if (this.options.homeBounds) {
            this._map.fitBounds(this.options.homeBounds);
        }
        else if (this.options.homeLatLng) {
            this._map.setView(this.options.homeLatLng,this.options.homeZoom);
        }
    },

    _updateDisabled: function () {
        const z = this._map.getZoom();
        const minz = map.getMinZoom();
        const maxz = map.getMaxZoom();

        if (z <= minz) L.DomUtil.addClass(this._outbutton, 'leaflet-control-zoom-disabled');
        else L.DomUtil.removeClass(this._outbutton, 'leaflet-control-zoom-disabled');

        if (z >= maxz) L.DomUtil.addClass(this._inbutton, 'leaflet-control-zoom-disabled');
        else L.DomUtil.removeClass(this._inbutton, 'leaflet-control-zoom-disabled');
    }
});