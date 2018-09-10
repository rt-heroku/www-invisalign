var _dlMapHelper = function () {};
_dlMapHelper.prototype = {
    _map: null
    , _markers: null
    , _clusterer: null
    , _selectedMarker: null
    , _infoBox: null
    , _infoBoxOptions: null
    , _callback: null
    , options: null
    , _defaultOptions: {
        openInfoWindowOnMarkerSelect: true
        , closeInfoWindowOnMarkerDeselect: false
        , selectMarkerOnMouseOver: false
        , deselectMarkerOnMouseOut: false
        , deselectMarkerOnInfoBoxClose: false
    }
    , _defaultMapOptions: { mapTypeId: google.maps.MapTypeId.ROADMAP
        , overviewMapControl: false
        , panControl: false
        , rotateControl: false
        , streetViewControl: false
        , scaleControl: true
        , zoom: 12
        , zoomControlOptions: { style: google.maps.ZoomControlStyle.SMALL }
    }
    , _defaultInfoBoxOptions: {
        disableAutoPan: false
        ,maxWidth: 300
        ,boxStyle: { 
          opacity: 0.8
          , width: "200px"
         }
        ,pixelOffset: new google.maps.Size(-84, -92)
        ,infoBoxClearance: new google.maps.Size(1, 1)
        ,isHidden: false
        ,closeBoxURL:""
        ,pane: "floatPane"
        ,enableEventPropagation: false
    }
    , _defaultRendererOptions: {
        suppressMarkers: true
    }

    // public
    , CreateMap: function(options) {

        this._markers = [];
        this.options = $.extend({}, this._defaultOptions, options || {});

        var mapOptions = $.extend({}, this._defaultMapOptions, options.mapOptions || {});
        if ($(options.elementId).size() == 0) return;
        
        this._map = new google.maps.Map($(options.elementId).get(0), mapOptions);
        if (window['MarkerClusterer']) { this._clusterer = new MarkerClusterer(this._map, [], { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' }); this._clusterer.setMaxZoom(12); this._clusterer.setGridSize(40); }
        
        if (options.dragEnd) google.maps.event.addListener(this._map, 'dragend', function () { options.dragEnd(); });

        this._callback = this.options.callback;
        this._infoBoxOptions = $.extend({}, this._defaultInfoBoxOptions, options.infoBoxOptions || {});
        this._infoBox = new InfoBox(this._infoBoxOptions);

        var p = this;
        google.maps.event.addListener(this._infoBox, 'closeclick', function () { p.CloseInfoBoxInternal(); });
        google.maps.event.addListener(this._infoBox, 'domready', function () { p.TriggerCallback ('infobox_domready', true); });
    }

    , ShowDirections: function (options) {

        options = options || {}
        if (!options.directionsResults) return;

        if (!this._directionsDisplay) {
            var rendererOptions = $.extend({ }, this._defaultRendererOptions, options.rendererOptions || {});
            rendererOptions.map = this._map;
            this._directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
        }

        this._directionsDisplay.setDirections(options.directionsResults);
        if (options.hideInfoBox) {
            this.CloseInfoBoxInternal(true);
        }
    }

    // public
    , GetMapCenter: function () {
        return this._map.getCenter();
    }

    // public
    , SetMapOptionsDirect: function (mapOptions) {
        this._map.setOptions(mapOptions);
    }

    // public
    , SetMapOptions: function(mapOptions) {
    
        if (mapOptions.center) { this._map.setCenter(mapOptions.center); }
        if (mapOptions.zoom) { this._map.setZoom(mapOptions.zoom); }
    }

    // public
    , SetInfoBoxOptions: function(infoBoxOptions) {

        infoBoxOptions = $.extend({}, this._infoBoxOptions, infoBoxOptions);
        this._infoBox.setOptions(infoBoxOptions);   
    }
    
    // public
    , PanInfoBox: function() {
        this._infoBox.panBox_(false);
    }

    // public
    , HandleResize: function() {
        if (this._map) google.maps.event.trigger(this._map, "resize");
    }

    // public
    , AddMarkers: function (options) {
        
        var p = this, items = options.items || [];

        if (!options.keepExisting) {
            this.RemoveMarkers();
        }
        
        if (options.hideInfoBox) {
            this.CloseInfoBoxInternal(true);
        }

        if (options.fitBounds && items.length) {
            this.FitBounds(items);
        }
        $.each(options.items || [], function (idx, it) { p._markers.push (p.CreateMarker(it, 1000 - p._markers.length, options.dontUseTooltip)); });
    }
    
    // public
    , FitBounds: function (items) {
    
        if (!items.length) return;

        var bounds = new google.maps.LatLngBounds();
        // add the center point first with some adjacent area
        bounds.extend(new google.maps.LatLng(items[0].Latitude - 0.002, items[0].Longitude - 0.002));
        bounds.extend(new google.maps.LatLng(items[0].Latitude + 0.002, items[0].Longitude + 0.002));

        $.each(items, function (idx, it) { bounds.extend(new google.maps.LatLng(it.Latitude, it.Longitude)); });
        this._map.fitBounds(bounds);

        /*
        // custom bounds
        var pixelWidth = 600;
        var GLOBE_WIDTH = 256; // a constant in Google's map projection
        var west = bounds.getSouthWest().lng(); var east = bounds.getNorthEast().lng();
        var angle = east - west; if (angle < 0) { angle += 360; }
        var zoom = Math.floor(Math.log(pixelWidth * 360 / angle / GLOBE_WIDTH) / Math.LN2);
        this._map.setCenter(bounds.getCenter());
        this._map.setZoom(zoom);
        */
    }
    
    // public
    , RemoveMarkers: function () {
        
        if (this._selectedMarker) this.SetSelectedMarker(null);
        var p = this;
        if (this._clusterer) { this._clusterer.clearMarkers(); }
        $.each(this._markers, function(idx, marker) {  
            google.maps.event.clearInstanceListeners (marker);
            marker.setMap(null);
        });
        this._markers.length = 0;
    }
    
    // public
    , GetMarker: function (idx) {
        return this._markers[idx] ? this._markers[idx] : null;
    }
    
    // public
    , FindMarker: function (func) {
        for (var i = 0; i < this._markers.length; i++) { if (func(i, this._markers[i])) return this._markers[i]; }
        return null;
    }

    // public
    , SelectMarker: function(marker, select) {
        this.SelectMarkerInternal(marker, select);
    }
    
    // public
    , HighlightMarker: function(marker, select){
        if (select) { this.SetMarkerIcon(marker, true); }
        else if (marker != this._selectedMarker) { this.SetMarkerIcon(marker, false); }
    }
    
    // public
    , CloseInfoBox: function() {
        this.CloseInfoBoxInternal();
    }
    
    // public
    , CenterMap: function (latlon, noPan) {
        if (noPan) this._map.setCenter(latlon);
        else this._map.panTo(latlon);
    }
    
    // public
    , OpenInfoBoxForLatLon: function (options) {
        this.OpenInfoBoxForLatLonInternal(options);
    }

    // private
    
    , CreateMarker: function (data, zIndex, dontUseTooltip) {
        var p = this, markerConfig = {
            position: new google.maps.LatLng(data.Latitude, data.Longitude)
            , map: this._map
            , icon: data.MarkerIcon
            , zIndex: data.MarkerZIndex ? data.MarkerZIndex : zIndex
        };

        if (data.draggable) markerConfig.draggable = true;
        if (!dontUseTooltip) markerConfig.title = data.MarkerTitle;

        if (data.MarkerShadow) markerConfig.shadow = data.MarkerShadow;

        var marker = new google.maps.Marker(markerConfig);
        if (this._clusterer && data && data.DocID) { this._clusterer.addMarker(marker); }
        marker._associatedItem = data;

        google.maps.event.addListener(marker, 'click', function () { if (marker.beingDragged) return; p.HandleMarkerClick(marker); });
        google.maps.event.addListener(marker, 'mouseover', function () { if (marker.beingDragged) return; p.HandleMarkerMouseOver(marker); });
        google.maps.event.addListener(marker, 'mouseout', function () { if (marker.beingDragged) return; p.HandleMarkerMouseOut(marker); });
        if (data.draggable) {
            google.maps.event.addListener(marker, 'dragstart', function () { marker.beingDragged = true; p.CloseInfoBoxInternal(); });
            google.maps.event.addListener(marker, 'dragend', function () { marker.beingDragged = false; p.TriggerCallback('center_move', true, marker); });
        }

        return marker;
    }
    
    , SetMarkerIcon: function (marker, selected) {
        if (!marker || !marker._associatedItem) return;
        if (selected) {
            if (marker._associatedItem.MarkerSelectedIcon) marker.setIcon(marker._associatedItem.MarkerSelectedIcon);
            if (marker._associatedItem.MarkerSelectedShadow) marker.setShadow(marker._associatedItem.MarkerSelectedShadow);
        }
        else {
            if (marker._associatedItem.MarkerIcon) marker.setIcon(marker._associatedItem.MarkerIcon);
            if (marker._associatedItem.MarkerShadow) marker.setShadow(marker._associatedItem.MarkerShadow);
        }
    }

    , SetSelectedMarker: function(marker) {
        var p = this;
        $.each(this._markers, function(idx, it) { p.SetMarkerIcon(it, false); })
        if (marker) p.SetMarkerIcon(marker, true);
        this._selectedMarker = marker;
        this.TriggerCallback ('marker', marker ? true : false);
    }

    , OpenInfoBoxForMarker: function (marker) {
        if (!marker._associatedItem) return;

        var h = $.render[marker._associatedItem.InfoBoxTemplate](marker._associatedItem);
        if (marker._associatedItem.InfoBoxTipTemplate) h += $.render[marker._associatedItem.InfoBoxTipTemplate](marker._associatedItem);
        
        if (marker._associatedItem.infoBoxOptions){
            var infoBoxOptions = $.extend({}, this._infoBoxOptions, marker._associatedItem.infoBoxOptions);
            this._infoBox.setOptions(infoBoxOptions);
        }

        this._infoBox.setContent(h);
        this._infoBox.open(this._map, marker);
        this.TriggerCallback ('infobox', true);
    }

    , OpenInfoBoxForLatLonInternal: function (options) {
        var latlon = options.latlon;
        var conents = options.contents || '';
        var infoBoxOptions = options.infoBoxOptions || {};
        
        if (!latlon) return;
        
        infoBoxOptions = $.extend({}, this._infoBoxOptions, infoBoxOptions);
        this._infoBox.setOptions(infoBoxOptions);

        this._infoBox.setContent(conents);
        this._infoBox.open(this._map, null);
        this._infoBox.setPosition (latlon);

        this.TriggerCallback ('infobox', true);
    }

    , HandleMarkerClick: function (marker) {
        this.SelectMarkerInternal(marker, true);
    }

    , HandleMarkerMouseOver: function (marker) {
        if (this.options.selectMarkerOnMouseOver) {
            this.SelectMarkerInternal(marker, true);
        }
    }

    , HandleMarkerMouseOut: function (marker) {
        if (this.options.deselectMarkerOnMouseOut) {
            this.SelectMarkerInternal(marker, false);
        }
    }

    , SelectMarkerInternal: function(marker, select){
        if (select){
            if (this._selectedMarker == marker) return;
        
            if (this._selectedMarker) {
                this.SetSelectedMarker(null);
            }

            this.SetSelectedMarker(marker);
            if (this.options.openInfoWindowOnMarkerSelect) this.OpenInfoBoxForMarker (marker);
        }
        else {
            if (this.options.closeInfoWindowOnMarkerDeselect) this.CloseInfoBoxInternal(true);
            this.SetSelectedMarker(null);
        }
    }

    , CloseInfoBoxInternal: function(dontDeselectMarker) {
        this._infoBox.close();
        this.TriggerCallback ('infobox', false);
        if (!dontDeselectMarker && this.options.deselectMarkerOnInfoBoxClose && this._selectedMarker) {
            this.SetSelectedMarker(null);
        }
    }

    , TriggerCallback: function (type, show, marker){
        if (!this._callback) return;
        var data = {
            type: type
            , show: show
            , marker: marker ? marker : this._selectedMarker
            , sender: this
        };
        this._callback(data);
    }
};