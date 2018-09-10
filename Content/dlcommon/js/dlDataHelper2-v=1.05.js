var _dlDataHelper = function () { };
_dlDataHelper.prototype = {
    implementationType: 'eu'
    , blackListAddresses: ['shell deutschland-tor 1, 50997 köln']
    , searchTypes: { "ZIP": "ZIP", "CITY": "CITY", "ADDRESS": "ADDRESS", "COUNTRY": "COUNTRY", "COORDS": "COORDS" }
    , errorCodes: { "Unknown": "Unknown", "InvalidAddress": "InvalidAddress", "ServerError": "ServerError", "NoResults": "NoResults", "DirectionsError": "DirectionsError" }
    , countryChangeMap: { "uk": {"Isle of Man": { "pc": /^im.+$/i, "city": /^(isle of man|douglas)/i } , "Guernsey": { "pc": /^gy.+$/i, "city": /^(guernsey)\b/i }, "Jersey": { "pc": /^je.+$/i, "city": /^(jersey|(st\.? |)brelade|(st\.? |)helier)\b/i } } }
    , sessionID: _dlMiscHelper.GenerateShortGuid()

    // public

    , SearchItems: function (request, callback) {
        
        this.InitResponseData(request);
        var data = this.data; data.city = data.city || ''; data.address = data.address || ''; data.postalCode = data.postalCode || '';

        $.extend(this.data, { searchType: this.GetSearchType(), inputSearchType: this.GetSearchType(), effectiveRadius: 0, formattedAddress: null, radius: this.data.inputRadius || this.GetDefaultPCRadius(), radiusIncrement: this.GetDefaultPCRadiusIncrement(), searchFormattedAddress: this.FormatSearchAddress(), hasCoordinates: false });
        if (_dlMiscHelper.IsNumber(this.data.latitude) && _dlMiscHelper.IsNumber(this.data.longitude)) { this.data.latitude = parseFloat(this.data.latitude); this.data.longitude = parseFloat(this.data.longitude); this.data.formattedAddress = this.FormatLatLonAddress(this.data.latitude, this.data.longitude); this.data.hasCoordinates = true; }

        var p = this, data = this.data;
        var searchWrapper = function () {

            data.searchRequest = { postalCode: data.postalCode, data: data.address, filterName: data.name, city: data.city, postalCode: data.postalCode, countryList: p.GetCountryList(), filter: data.filter, sort: data.sort, radius: data.radius, radiusIncrement: data.radiusIncrement, implementationType: p.implementationType, sessionID: data.sessionID || '', contextID: data.contextID, longitude: data.longitude, latitude: data.latitude };
            var req = $.extend({}, data.searchRequest);
            req.callback = function (result, status) {
                
                p.SetRequestTime('endResults');
                if (status != _DocLocAjax.doclocStatuses.OK) { p.SetError(p.errorCodes.NoResults); }
                else { data.items = result.results; data.effectiveRadius = result.effectiveRadius; }
                callback(data);
            };

            p.SetRequestTime('beginResults');
			
            if (data.searchType == p.searchTypes.COUNTRY) { _DocLocAjax.GetResultsForName(req); } else { _DocLocAjax.GetResultsForCoordinates(req); }
        };

        if (data.hasCoordinates) { searchWrapper(); }
        else {
            this.GeoCodeAddress(function (result, status) {
                if (status != _DocLocAjax.geocodeStatuses.OK) { p.SetError(p.errorCodes.InvalidAddress); callback(data); return; }
                result = p.SelectGeoResult(result);
                if (!p.ValidateGeocodeResult(result)) { p.SetError(p.errorCodes.InvalidAddress); callback(data); return; }
                else {
                    
                    $.extend(data, { latitude: result.lat, longitude: result.lng, formattedAddress: result.formattedAddress, geoResult: result });
                    if (!data.inputRadius) { p.AdjustCityRadius(); p.AdjustManualPCRadius(); }
                    searchWrapper();
                }
            });
        }
    }

    , SelectGeoResult: function (result) {

        if (result.length && result.length > 1 && this.IsCitySearch() && /^(es|gb)$/i.test(this.data.country)) {
            if (result[0].accuracy == 'airport') { return result[1]; }
        }
        return result[0];
    }

    , GetAdditionalItems: function (request, callback) {

        this.InitResponseData(request);
        var data = this.data, p = this;

        this.SetRequestTime('beginAdditionals');
        _DocLocAjax.GetAdditionalLocations({
            referenceDocID: data.docId
                , latitude: data.latitude
                , longitude: data.longitude
                , sessionID: data.sessionID
                , contextID: data.contextID
                , callback: function (results, status) {
                    p.SetRequestTime('endAdditionals');
                    if (status == _DocLocAjax.doclocStatuses.OK) {
                        data.items = results.results;
                    }
                    else { p.SetError(p.errorCodes.NoResults); }
                    callback(data);
                }
        });
    }

    , GetDirections: function (request, callback) {

        this.InitResponseData(request);
        var data = this.data, p = this;

        var refAddr = data.referenceAddress;
        data.directionsOrigin = refAddr;

        var addrParts = refAddr.split(',');
        if (addrParts.length <= 2) {
            var postalCode = addrParts[0];
            
            var coords = this.GetManualPostalCodeCoordinates(postalCode, request.country || '');
            if (coords) { data.directionsOrigin = coords.lat + ' ' + coords.lng; }
        }

        var directionsReq = {
            origin: data.directionsOrigin
            , destination: data.latitude + ' ' + data.longitude
            , travelMode: google.maps.TravelMode.DRIVING
            , unitSystem: this.data.distanceUnit == 'mi' ? google.maps.UnitSystem.IMPERIAL : google.maps.UnitSystem.METRIC
            , callback: function (results, status) { if (status != _DocLocAjax.geocodeStatuses.OK) { p.SetError(p.errorCodes.DirectionsError); } else { data.directionsResults = results; } callback(data); }
        };
        _DocLocAjax.GetDirections(directionsReq);
    }

    // private

    , FormatLatLonAddress: function (lat, lon) { try { return lat.toFixed(6) + ' ' + lon.toFixed(6); } catch (ex) { } return lat + ' ' + lon; }

    , InitResponseData: function (request) {
        this.SetCountryData(request.country);
        this.data = $.extend({ contextID: _dlMiscHelper.GenerateShortGuid(), sessionID: this.sessionID, requestTimes: {}, error: null }, request);
    }

    , GeoCodeAddress: function (callback) {

        var manualCoordinates = null;
        if (this.IsPostalCodeSearch()) manualCoordinates = this.GetManualPostalCodeCoordinates(this.data.postalCode, this.data.country);
        else if (this.IsCitySearch()) manualCoordinates = this.GetManualPostalCodeCoordinates(this.data.city, this.data.country);

        if (manualCoordinates) { callback([manualCoordinates], _DocLocAjax.geocodeStatuses.OK); return; }
        _DocLocAjax.GeocodeAddress({ geocodeAddress: this.data.searchFormattedAddress, callback: callback });
    }

    , GetManualPostalCodeCoordinates: function (postalCode, country) {
        var origPostalCode = (postalCode || '');
        postalCode = origPostalCode.toLowerCase();
        var manMap = this.GetManualPostalCodes();
        if (manMap && manMap[postalCode]) {
            var coord = manMap[postalCode];
            var address = origPostalCode + ', ' + (coord[2] || country).toUpperCase();
            return { "lat": coord[0], "lng": coord[1], "accuracy": _DocLocAjax.locationTypes.postal_code, "formattedAddress": address, "north": coord[0], "south": coord[0], "east": coord[1], "west": coord[1], "components": null };
        }
        return null;
    }

    , AdjustCityRadius: function () {
        var result = this.data.geoResult;
		if (this.data.searchType == this.searchTypes.COUNTRY) return;
        if (result.accuracy == _DocLocAjax.locationTypes.locality || result.accuracy == _DocLocAjax.locationTypes.sublocality || result.accuracy == _DocLocAjax.locationTypes.postal_town || result.accuracy == _DocLocAjax.locationTypes.administrative_area_level_1 || result.accuracy == _DocLocAjax.locationTypes.administrative_area_level_2 || result.accuracy == _DocLocAjax.locationTypes.administrative_area_level_3) {

            this.data.searchType = this.searchTypes.CITY;
            this.data.radius = this.GetDefaultCityRadius();
            this.data.radiusIncrement = this.GetDefaultCityRadiusIncrement();

            if (!(result.south == 0 && result.east == 0 && result.south == 0 && result.west == 0)) {
                var w = _dlMiscHelper.CalculateDistance(result.south, result.east, result.south, result.west);
                var h = _dlMiscHelper.CalculateDistance(result.south, result.east, result.north, result.east);

                var newRad = Math.min(Math.ceil(Math.max(w, h) / 2), 40);
                if (newRad > this.data.radius) {
                    this.data.radius = newRad;
                }
            }
        }
    }

    , AdjustManualPCRadius: function () {

        if (!this.IsPostalCodeSearch() && !this.IsCitySearch()) { return; }
        var test = this.data.postalCode && this.data.postalCode != '' ? this.data.postalCode : this.data.city;
        test = test.toLowerCase();
        var manMap = this.GetManualPCRadius();
        if (manMap && manMap[test] && manMap[test].length) { var rad = manMap[test][0]; this.data.radius = rad; }
    }

    , GetSearchType: function () {
        var zip = this.data.postalCode, city = this.data.city, address = this.data.address, lat = this.data.latitude, lng = this.data.longitude;
        if (_dlMiscHelper.IsNumber(lat) && _dlMiscHelper.IsNumber(lng)) { return this.searchTypes.COORDS; }
        else if (zip == '' && city == '' && address == '') { return this.searchTypes.COUNTRY; }
        else if (zip == '' && city != '' && address == '') { return this.searchTypes.CITY; }
        else if (zip != '' && address == '') { return this.searchTypes.ZIP; }
        else { return this.searchTypes.ADDRESS; }
    }

    , FormatSearchAddress: function () {
        var addressPattern = this.GetAddressPattern() == '' ? '{SA}, {PC} {CT}, {CY}' : this.GetAddressPattern(), data = this.data;
        var searchCountry = this.GetSearchCountry();
        
        searchCountry = this.CheckReplaceSearchCountry(searchCountry) || searchCountry;
        var searchAddress = addressPattern.replace('{SA}', data.address).replace('{PC}', data.postalCode).replace('{CT}', data.city).replace('{CY}', searchCountry);
        return searchAddress.replace(/^[, ]+/, '').replace(/[, ]+$/, '');
    }

    , ValidateGeocodeResult: function (result) {
        
        var cityLower = this.data.city.toLowerCase();
        var formattedLower = result.formattedAddress.toLowerCase();

        if (this.IsCitySearch() && result.components && result.accuracy != _DocLocAjax.locationTypes.locality && result.accuracy != _DocLocAjax.locationTypes.sublocality && result.accuracy != _DocLocAjax.locationTypes.postal_town) {
            for (var i = 0; i < result.components.length; i++) {
                var c = result.components[i];
                if (c.types && c.types.length && (c.types[0] == _DocLocAjax.locationTypes.route || c.types[0] == _DocLocAjax.locationTypes.street_number || c.types[0] == _DocLocAjax.locationTypes.premise || c.types[0] == _DocLocAjax.locationTypes.subpremise)) {
                    if (c.long_name && c.long_name.toLowerCase().indexOf(cityLower) >= 0) { return false; }
                }
            }
        }

        if (this.IsCitySearch() || this.IsPostalCodeSearch() || this.IsPostalCodeCitySearch()) {
            for (var i = 0; i < this.blackListAddresses.length; i++) {
                if (formattedLower.indexOf(this.blackListAddresses[i]) >= 0) { return false; }
            }
        }

        var re = this.GetCountryRestrictionRe();
        if (re && result.components) {
            var countryCode = null;
            for (var i = 0; i < result.components.length; i++) {
                var c = result.components[i];
                if (c.types && c.types.length && c.types[0] == _DocLocAjax.locationTypes.country && c.short_name && c.short_name.length < 3) {
                    countryCode = c.short_name; break;
                }
            }
            if (countryCode && !countryCode.match(re)) { return false; }
        }

        return true;
    }

    , CheckReplaceSearchCountry: function (searchCountry) {

        var checkCountry = searchCountry.toLowerCase();
        var map = this.countryChangeMap[checkCountry];
        if (!map) { return searchCountry; }

        var postalCode = $.trim(this.data.postalCode);
        var city = $.trim(this.data.city), tmp = null;
        for (var n in map) {
            var obj = map[n];
            if (obj) {
                if (obj.pc && obj.pc.test(postalCode)) { tmp = n; break; }
                if (obj.city && obj.city.test(city)) { tmp = n; break; }
            }
        }
        return tmp || searchCountry;
    }

    , IsCitySearch: function () { return this.data.inputSearchType == this.searchTypes.CITY; }
    , IsPostalCodeSearch: function () { return this.data.inputSearchType == this.searchTypes.ZIP; }
    , IsPostalCodeCitySearch: function () { return (this.data.postalCode.length > 0 && (this.data.city.length > 0) && (!this.data.address.length)); }

    , SetRequestTime: function (timeLabel) { this.data.requestTimes[timeLabel] = new Date(); }
    , SetError: function (errorCode) { this.data.error = errorCode; }
    , SetCountryData: function (country) { this.countryData = _dlLocaleHelper.GetCountryDataByCode(country) || _dlLocaleHelper.GetCurrentCountryData(); }
    
    , GetSearchCountry: function () { return this.countryData.GetSearchCountry(); }
    , GetAddressPattern: function () { return this.countryData.GetAddressPattern(); }
    , GetCountryList: function () { return this.countryData.GetCountryList(); }
    , GetDefaultPCRadius: function () { return this.countryData.GetDefaultPCRadius(); }
    , GetDefaultCityRadius: function () { return this.countryData.GetDefaultCityRadius(); }
    , GetDefaultPCRadiusIncrement: function () { return this.countryData.GetDefaultPCRadiusIncrement(); }
    , GetDefaultCityRadiusIncrement: function () { return this.countryData.GetDefaultCityRadiusIncrement(); }
    , GetManualPostalCodes: function () { return this.countryData.GetManualPostalCodes(); }
    , GetManualPCRadius: function () { return this.countryData.GetManualPCRadius(); }
    , GetCountryRestrictionRe: function () { return this.countryData.GetCountryRestrictionRe(); }
};