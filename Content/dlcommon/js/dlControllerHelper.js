_dlControllerHelper = {
    _views: { "search": "search", "results": "results", "directions": "directions", "details": "details", "map": "map" }
    , _stateParams: {
        "view": { p1: "view", p2: "v", def: "" }
        , "postalCode": { p1: "zip", p2: "z", def: "", excludeViews: "search" }
        , "address": { p1: "address", p2: "a", def: "", excludeViews: "search" }
        , "name": { p1: "name", p2: "n", def: "", excludeViews: "search" }
        , "city": { p1: "city", p2: "c", def: "", excludeViews: "search" }
        , "type": { p1: "type", p2: "t", def: "adult", values: { "adult": 1, "teen": 1 }, excludeViews: "search" }
        , "country": { p1: "country", p2: "cy", def: "", excludeViews: "search" }
        , "page": { p1: "page", p2: "pr", def: 0, type: "number", excludeViews: "search" }
        , "pageAdditional": { p1: "pageadditional", p2: "pa", def: 0, type: "number", excludeViews: "search,results" }
        , "docId": { p1: "docid", p2: "d", def: 0, type: "number", excludeViews: "search,results" }
        , "dirId": { p1: "dirid", p2: "dd", def: 0, type: "number", excludeViews: "search,results,additionals" }
        , "referenceAddress": { p1: "reference", p2: "ra", def: "", excludeViews: "search,results,additionals" }
        , "sort": { p1: "sort", p2: "s", def: "e", values: { "e": 1, "d": 1 }, excludeViews: "search" }
        , "itero": { p1: "itero", p2: "it", def: "0", excludeViews: "search" }
        , "latitude": { p1: "latitude", p2: "lt", def: "", type: "number", excludeViews: "search" }
        , "longitude": { p1: "longitude", p2: "ln", def: "", type: "number", excludeViews: "search" }
        , "inputRadius": { p1: "radius", p2: "rd", def: "", type: "number", excludeViews: "search" }
        , "ipd": { p1: "ipd", p2: "ipd", def: "", excludeViews: "*" }
    }
    , _state: { view: "search" }
    , _renderCallback: null
    , _processing: false
    , _trackAfterDetailsPane: true

    // public
    , SetRenderCallback: function (callback) { this._renderCallback = callback; }
    , SetProcessingCallback: function (callback) { this._processingCallback = callback; }

    , SerializeState: function() {
        return this.SerializeStateInternal(this._state);
    }

    , SetStateFromParams: function (parms) {
        var state = {};
        for (var n in this._stateParams) {
            var par = this._stateParams[n];
            var v = parms[par.p2];
            if (typeof v == 'undefined' || v === null) v = parms[par.p1];
            state[n] = v ? v : par.def;
        }
        if (!state.view || !this._views[state.view]) {
            state.view = this.HasSufficientStateForSearch(state) ? this._views.results : this._views.search;
        }
        this.SetState(state, true);
    }

    , SetStateResults: function (obj) {

        obj = obj || {};
        obj.view = this._views.results;

        this.SetState(obj);
    }

    , SetStateSearchForm: function () {
        this.SetState({ view: this._views.search});
    }

    , SetStateDetails: function (id) {
        this.SetState({ view: this._views.details, dirId: id });
    }

    , SetStateMap: function (id) {
        this.SetState({ view: this._views.map, dirId: id });
    }

    , SetStateDirections: function (id, referenceAddress) {
        this.SetState({ view: this._views.directions, dirId: id, referenceAddress: referenceAddress });
    }

    , SetStateResultsPage: function (page) {
        this.SetState(this._state.docId ? { pageAdditional: page } : { page: page });
    }

    // private

    , SetState: function (obj, fromParams) {

        this.SetProcessing(true);
        var preState = $.extend({}, this._state, obj || {});
        this.NormalizeState(preState);

        if (this._state.view == this._views.search) { $.extend(this._state, preState, { view: this._views.search }); }

        var p = this;
        var error = this.GetStateValidationError(preState);
        if (error) {
            this.GetData(this._state, function (data) { data.error = error; p.InvokeRenderCallback(data); }); return;
        }

        this.GetData(preState, function (data) {

            var error = data.error, errorCode = data.errorCode, errorSearchData = data.errorSearchData;
            if (error) {
                p.GetData(p._state, function (d) { d.error = error; d.errorCode = errorCode; d.errorSearchData = errorSearchData; p.InvokeRenderCallback(d); });
            } else {

                p._prevState = $.extend({}, p._state);
                $.extend(p._state, preState);
                data.fromParams = fromParams ? true : false;
                p.InvokeRenderCallback(data);
            }
        });
    }

    , NormalizeState: function (state) {
        for (var n in this._stateParams) {
            var par = this._stateParams[n];
            if (typeof state[n] == 'undefined') { state[n] = par.def; }

            if (par.type == 'number' && _dlMiscHelper.IsNumber(state[n])) { state[n] = _dlMiscHelper.GetNumber(state[n], par.def); }
            if (par.values && !par.values[state[n]]) { state[n] = par.def; }
        }
        
        if (!state.view || !this._views[state.view]) { state.view = this._views.search; }        
        if (!state.country || !_dlLocaleHelper.GetCountryDataByCode(state.country)) { state.country = _dlLocaleHelper.GetCountryCodeLower(); }
        state.country = state.country.toLowerCase();
        _dlLocaleHelper.SetCurrentCountryDataByCode(state.country);
    }

    , SerializeStateInternal: function(state) {
        var obj = {};
        var v = state.view;
        if (v == this._views.results && state.docId) { v = 'additionals'; }
        for (var n in this._stateParams) {
            var par = this._stateParams[n];
            if (par.excludeViews && ((par.excludeViews == '*') || par.excludeViews.indexOf(v) >= 0)) { continue; }
            obj[par.p2] = state[n];
        }
        return obj;
    }

    , GetSearchKey: function (state) {
        var tempState = $.extend({}, state, { view: 'results', docId: 0 });
        var obj = this.SerializeStateInternal(tempState); obj.pr = null; obj.v = null;
        var keys = []; for (var n in obj) { if (obj[n] !== null) keys.push(n); }
        keys.sort();
        var s = ''
        for (var i = 0; i < keys.length; i++) s += '&' + keys[i] + '=' + obj[keys[i]];
        return s;
    }

    , InvokeRenderCallback: function (data) {
        this.SetProcessing(false);
        data.view = this._state.view;
        data.prevView = this._prevState ? this._prevState.view : null;
        if (data.view == 'search') data.reset = data.error ? false : true;

        this.HandleTracking(data);
        if (this._renderCallback) { this._renderCallback(data); }
    }

    , HandleTracking: function (data) {
        if (data.error) {
            var errorCode = data.errorCode;
            if (errorCode) {
                var codes = _dlDataHelper.prototype.errorCodes;
                if (errorCode == codes.InvalidAddress) { _dlTrackingHelper.LogEvent(data, _dlTrackingHelper.callbackTypes.INVALID_ADDRESS); }
                else if (errorCode == codes.ServerError) { _dlTrackingHelper.LogEvent(data, _dlTrackingHelper.callbackTypes.SERVER_ERROR); }
                else if (errorCode == codes.NoResults) { _dlTrackingHelper.LogEvent(data, _dlTrackingHelper.callbackTypes.NO_RESULTS); }
            }
        }
        else {
            var prevView = this._prevState ? this._prevState.view : null;
            if (data.view == this._views.results) {
                if (this._trackAfterDetailsPane || prevView != this._views.details) {
                    var eventType = _dlTrackingHelper.callbackTypes.PAGE_CHANGED;

                    if (!data.searchData.fromCache && !data.parentItem) eventType = _dlTrackingHelper.callbackTypes.RESULTS_OK;
                    if (data.parentItem) eventType = _dlTrackingHelper.callbackTypes.VIEW_ADDITIONAL_LOCATIONS;

                    _dlTrackingHelper.LogEvent(data, eventType);
                }
            }
            else if (data.view == this._views.details) { _dlTrackingHelper.LogEvent(data, _dlTrackingHelper.callbackTypes.VIEW_CONTACT_INFO); }
        }
    }

    , GetData: function (state, callback) {
        var data = { state: $.extend({}, state) };
        if (state.view == this._views.search) { callback(data); return; }
        var p = this;
        
        var handleDirectionsData = function (directionsData) {
            if (directionsData.error) { data.error = directionsData.error; data.errorCode = directionsData.errorCode; callback(data); return; }

            data.directions = directionsData.directions; data.directionsData = directionsData.directionsData;
            callback(data);
        };

        var handleAdditionalData = function (additionalData) {
            if (additionalData.error) { data.error = additionalData.error; data.errorCode = additionalData.errorCode; callback(data); return; }

            data.items = additionalData.items;
            postAdditionalHandle();
        };

        var postAdditionalHandle = function () {
            if (state.view != p._views.results) {
                if (state.dirId) {
                    var item = data.searchData.itemMap[state.dirId];
                    if (!item) { data.error = _dlMiscHelper.Res('labelNoResults'); callback(data); return; }
                    else { data.item = item; }
                }

                if (state.view == p._views.directions || state.view == p._views.details) {
                    if (!data.item) { data.error = _dlMiscHelper.Res('labelNoResults'); }
                    else if (state.view == p._views.directions) { p.GetDirectionsData(state, item, data.searchData, handleDirectionsData); return; }
                }
            }
            else { data.page = (state.docId ? state.pageAdditional : state.page) || 0; }
            callback(data);
        };

        var handleSearchData = function (searchData) {
            if (searchData.error) {
                data.errorCode = searchData.error;
                data.error = p.GetErrorFromCode(searchData.error, searchData);
                data.errorSearchData = searchData;
                callback(data);
                return;
            }

            data.searchData = searchData; data.items = searchData.items;

            if (state.docId) {
                var item = searchData.itemMap[state.docId];
                if (!item) { data.error = _dlMiscHelper.Res('labelNoResults'); callback(data); return; }

                data.parentItem = item;
                p.GetAdditionalData(state, item, searchData, handleAdditionalData);
                return;
            }

            postAdditionalHandle();
        };

        this.GetSearchData(state, handleSearchData);
    }

    , SetProcessing: function (val) {
        this._processing = val;
        if (this._processingCallback) this._processingCallback(val);
    }

    , GetErrorFromCode: function (errorCode, searchData) {
        var codes = _dlDataHelper.prototype.errorCodes;
        var searchTypes = _dlDataHelper.prototype.searchTypes;

        if (errorCode == codes.InvalidAddress) {
            if (searchData) {
                if (searchData.searchType == searchTypes.CITY) { return _dlMiscHelper.Res('unrecognizedCity'); }
                else if (searchData.searchType == searchTypes.ZIP) { return _dlMiscHelper.Res('unrecognizedPostalCode'); }
            }
            return _dlMiscHelper.Res('unrecognizedAddress');
        }
        else if (errorCode == codes.DirectionsError){
            return _dlMiscHelper.Res('generalDirectionsError');
        }
        return _dlMiscHelper.Res('labelNoResults');
    }

    , GetSearchData: function (state, callback) {
        var p = this;
        var searchKey = this.GetSearchKey(state);
        var searchData = _CacheHelper.Get(searchKey);
        if (!searchData) {
            var request = $.extend({}, state);
            this.SetSearchFilterAndSort(request);

            var dh = new _dlDataHelper();
            dh.SearchItems(request, function (searchData) { if (!searchData.error) { _CacheHelper.Add(searchKey, searchData); searchData.searchKey = searchKey; searchData.itemMap = {}; p.ForAll(searchData.items, function (it) { searchData.itemMap[it.DocID] = it; }); } callback(searchData); });
        }
        else { searchData.fromCache = true; callback(searchData); }
    }

    , GetAdditionalData: function (state, item, searchData, callback) {
        var data = {}, p = this;

        var setItems = function (additionalItems) {
            item.additionalItems = additionalItems;
            p.ForAll(additionalItems, function (it) { searchData.itemMap[it.DocID] = it; });

            data.items = additionalItems.slice(0);
            data.items.unshift(item);
            callback(data);
        };

        if (item.additionalItems) { setItems(item.additionalItems); return; }

        var dh = new _dlDataHelper(), req = $.extend({}, state, { latitude: searchData.latitude, longitude: searchData.longitude });
        dh.GetAdditionalItems(req, function (additionalsData) {
            if (additionalsData.error) { data.errorCode = additionalsData.error; data.error = p.GetErrorFromCode(additionalsData.error, searchData); callback(data); }
            else { setItems(additionalsData.items); }
        });
    }

    , GetDirectionsData: function (state, item, searchData, callback) {
        var data = {}, p = this;
        var dh = new _dlDataHelper(), req = $.extend({}, state, { latitude: item.Latitude, longitude: item.Longitude });

        dh.GetDirections(req, function (directionsData) {
            if (directionsData.error) { data.errorCode = directionsData.error; data.error = p.GetErrorFromCode(directionsData.error, searchData); callback(data); }
            else { data.item = item; data.directions = directionsData.directionsResults; data.directionsData = directionsData; callback(data); }
        });
    }

    , SetSearchFilterAndSort: function (data) {
        data.filter = data.type != 'adult' ? 'F2' : 'F1'; if (data.itero == '1') { data.filter += ',FITERO'; }
        data.sort = data.sort == 'd' ? 'S0' : (data.type != 'adult' ? 'S2' : 'S1');
        //if (data.ipd == '1') { if (data.sort == 'S1') data.sort = 'S5'; else if (data.sort == 'S2') data.sort = 'S6'; }
    }

    , GetStateValidationError: function (state) {

        if (state.view == this._views.search) { return null; }

        if (!this.HasSufficientStateForSearch(state)) { return _dlMiscHelper.Res('emptyAddress'); }
        else if (state.name && state.name.length > 0 && (state.name.length < 3)) { return _dlMiscHelper.Res('nameTooShort'); }
        else if (state.postalCode != '' && _dlLocaleHelper.GetZipRegex() && !state.postalCode.match(_dlLocaleHelper.GetZipRegex())) { return _dlLocaleHelper.GetZipError(); }

        if (state.view == this._views.directions) {
            if (!state.dirId || !state.referenceAddress || !state.referenceAddress.length) { return _dlMiscHelper.Res('emptyAddress'); }
        }

        return null;
    }

    , HasSufficientStateForSearch: function (state) {
        return (state.postalCode != '' || state.city != '' || state.name != '') || (_dlMiscHelper.IsNumber(state.latitude) && _dlMiscHelper.IsNumber(state.longitude));
    }

    , ForAll: function (arr, func) { for (var i = 0; i < arr.length; i++) { func(arr[i], i); } }
};

var _CacheHelper = {
    _map: {}
    , _keys: []
    , _maxItems: 10
    , Add: function (key, obj) {

        if (typeof this._map[key] == 'undefined') {
            if (this._keys.length >= this._maxItems) {
                var old = this._keys[0];
                this._keys.shift();
                this._map[old] = this.und;
            }
            this._keys.push(key);
        }
        this._map[key] = obj;
    }

    , Get: function (key) {
        return this._map[key];
    }
};