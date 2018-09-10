if (!window['radiusServiceUrl']) { var radiusServiceUrl = 'http://invisalign.eu/svcadv/rd'; }
if (!window['additionalLocationsServiceUrl']) { var additionalLocationsServiceUrl = 'http://invisalign.eu/svcadv/cla'; }
if (!window['searchByNameUrl']) { var searchByNameUrl = 'http://invisalign.eu/svcadv/sbn'; }
if (!window['logServiceUrl']) { var logServiceUrl = 'http://invisalign.eu/svcadv/log'; }
if (!window['miscDataServiceUrl']) { var miscDataServiceUrl = 'http://invisalign.eu/svcadv/msc'; }

var _DocLocAjax =
{
    getResultsConfig: {
        url: radiusServiceUrl
        , checkParams: { 'postalCode': 15, 'streetAddress': 100, 'city': 35, 'state': 20 }
        , paramMap: { latitude: "lat" , longitude: "lng", radius: "rd" , radiusIncrement: "rdi" , countryList: "cl", filter: "f", sort: "s", postalCode: "upc", streetAddress: "usa", city: "uct", state: "ust", searchAddress: "gsa", implementationType: "it", preset: "pst", searchAddress: "sa", filterName: "fn" }
        , addContextParams: true
        , successHandler: 'HandleReturnResults'
        , successReturnMember: null
    }
    
    , getAdditionalLocationsConfig: {
        url: additionalLocationsServiceUrl
        , checkParams: null
        , paramMap: { referenceDocID: 'rd', latitude: "lat", longitude: "lng" }
        , addContextParams: true
        , successHandler: 'HandleReturnResults'
        , successReturnMember: null
    }
    
    , getResultsForNameConfig: {
        url: searchByNameUrl
        , checkParams: { 'postalCode': 15, 'streetAddress': 100, 'city': 35, 'state': 20, 'filterName': 40 }
        , paramMap: { latitude: "lat", longitude: "lng", countryList: "cl", filter: "f", sort: "s", postalCode: "upc", streetAddress: "usa", city: "uct", state: "ust", searchAddress: "gsa", implementationType: "it", preset: "pst", filterName: "fn"}
        , addContextParams: true
        , successHandler: 'HandleReturnResults'
        , successReturnMember: null
    }
    
    , logConfig: {
        url: logServiceUrl
        , checkParams: { 'postalCode': 15, 'streetAddress': 100, 'city': 35, 'state': 20, 'filterName': 40 }
        , paramMap: { logType: "lt", implementationType: "it", streetAddress: "sad", postalCode: "spc", city: "sct", countryList: "scy", filter: "sfr", sort: "ssr", searchStatus: "ssu", searchType: "sty", searchSource: "ssc", latitude: "slt", longitude: "sln", results: "srt", radius: "srd", effectiveRadius: "ser", startPosition: "ssp", endPosition: "sep", primaryDocId: "pdi", duration: "sdu", docIdList: "dil", filterName: "snm" }
        , addContextParams: true
        , successHandler: null
        , successReturnMember: null
    }
    
    , miscDataConfig: {
        url: miscDataServiceUrl
        , checkParams: null
        , paramMap: { }
        , addContextParams: false
        , successHandler: null
        , successReturnMember: 'browserData'
    }

    // public
    // data: { latitude: "...", longitude: "...", postalCode: "...", streetAddress: "...",  city: "...", state: "...", countryList: "...", filter: "...", sort: "...", radius: "...", radiusIncrement: "...", implementationType: "...", preset: "", callback: "..." }
    , GetResultsForCoordinates: function (data) {

        this.ExecAjax(data, this.getResultsConfig);
    }
    
    // public
    // data: { latitude: "...", longitude: "...", streetAddress: "...", postalCode: "...", city: "...", state: "...", countryList: "...", filter: "...", sort: "...", filterName: "...", implementationType: "...", preset: "", callback: "..." }
    , GetResultsForName: function (data) {

        this.ExecAjax(data, this.getResultsForNameConfig);
    }

    // public
    // data = { referenceDocID: 1, latitude: 0, longitude: 0 }
    , GetAdditionalLocations: function (data) {

        this.ExecAjax(data, this.getAdditionalLocationsConfig);
    }

    // public
    // data = { implementationType: 'eu', logType: _DocLocAjax.logTypes.ResultsLoad }
    , LogEvent: function (data) {

        if (!data || !data.implementationType || data.implementationType == '' || !data.logType || data.logType == '') return;
        this.ExecAjax(data, this.logConfig);
    }

    // public
    // data = {  }
    , GetMiscData: function (data) {

        this.ExecAjax(data, this.miscDataConfig);
    }

    // public
    // data: { geocodeAddress: "...", callback: "..." }
    , GeocodeAddress: function (data) {
        var p = this;
        var req = { 'address': data.geocodeAddress };

        this.Geocoder().geocode(req
            , function (results, status) {
                var resultAddressess = null;
                if (status == google.maps.GeocoderStatus.OK) {
                    resultAddressess = p.GetAddressesFromAddressResults(results);
                }
                if (data.callback) data.callback(resultAddressess, status);
            });
    }

    // public
    // data: { origin: "...", destination: "...", travelMode: "...", unitSystem: "...", region: "...", callback: "..." }
    , GetDirections: function (data) {
        var p = this;
        var req = { 'origin': data.origin, 'destination': data.destination, 'travelMode': data.travelMode, 'unitSystem': data.unitSystem, 'region': data.region };
        this.DestinationService().route(req
            , function (results, status) {

                if (data.callback) data.callback(results, status);
            });
    }

    // private
    , ExecJsonpAjax: function (url, data, success) {
        $.ajax(
        {
            url: url
            , data: data
            , type: 'GET'
            , crossDomain: true
            , processData: true
            , dataType: "jsonp"
            , jsonp: "method"
            , success: success
        });    
    }
    
    //private
    , ExecAjax: function (data, config) {
        var p = this;
        if (config.checkParams) {
            for (var n in config.checkParams) { this.CheckCorrectObjParamLength(data, n, config.checkParams[n]); }
        }
        
        var reqData = {};
        if (config.paramMap){
            for (var n in data) {
                if (config.paramMap[n]) { reqData[config.paramMap[n]] = data[n]; }
            }
        }
        else { reqData = data; }
        
        if (config.addContextParams) this.AddContextParams(data, reqData);       
        
        this.ExecJsonpAjax (config.url, reqData, function(respData) {
            if (config.successHandler) p[config.successHandler](respData, data.callback);
            else if (config.successReturnMember){
                var status = (respData && respData.responseStatus == 200) ? p.doclocStatuses.OK : p.doclocStatuses.SERVER_ERROR;
                if (data.callback) data.callback(respData ? respData[config.successReturnMember] : null, status);
            }
        });
    }
    
    // private
    , HandleReturnResults: function(respData, callback){
        var status = this.doclocStatuses.SERVER_ERROR;
        var results = null;
        var responseData = null;
        if (respData && respData.responseStatus) {
            if (respData.responseStatus == 200) status = this.doclocStatuses.OK;
            if (respData.responseData && respData.responseData.results) {
                responseData = respData.responseData;
                results = responseData.results;
                if (!results.length || results.length == 0) status = this.doclocStatuses.ZERO_RESULTS;
            }
        }

        if (callback) callback(responseData, status);
    }

    // private
    , AddContextParams: function (inputData, requestData) {
        if (inputData.contextID && inputData.contextID.length) requestData.cid = inputData.contextID;
        if (inputData.sessionID && inputData.sessionID.length) requestData.sid = inputData.sessionID;
        requestData.vid = this.GetVisitorId();
    }

    // private
    , GetAddressesFromAddressResults: function (results) {
        var p = this;
        return $.map(results, function(it) { return p.GetAddressFromAddressResult(it); });
    }

    // private
    , GetAddressFromAddressResult: function (result) {
        var accuracy = "", lat = 0.0, lng = 0.0, north = 0.0, south = 0.0, east = 0.0, west = 0.0, components = [];
        if (result.types && result.types.length > 0) accuracy = result.types[0];
        if (result.geometry && result.geometry.location) {
            lat = result.geometry.location.lat();
            lng = result.geometry.location.lng();
        }
        if (result.address_components && result.address_components.length) { components = result.address_components; }
        if (result.geometry && result.geometry.bounds) {
            north = result.geometry.bounds.getNorthEast().lat();
            east = result.geometry.bounds.getNorthEast().lng();
            south = result.geometry.bounds.getSouthWest().lat();
            west = result.geometry.bounds.getSouthWest().lng();
        }
        return { "lat": lat, "lng": lng, "accuracy": accuracy, "formattedAddress": result.formatted_address, "north": north, "south": south, "east": east, "west": west, "components": components };
    }

    // private
    , Geocoder: function () {
        if (!this['_geocoder']) this['_geocoder'] = new google.maps.Geocoder();
        return this['_geocoder'];
    }

    // private
    , DestinationService: function () {
        if (!this['_destinationService']) this['_destinationService'] = new google.maps.DirectionsService();
        return this['_destinationService'];
    }

    // private
    , CheckCorrectObjParamLength: function (obj, parmName, maxLength) {
        if (obj[parmName] && obj[parmName].length && obj[parmName].length > maxLength && obj[parmName].substr) {
            obj[parmName] = obj[parmName].substr(0, maxLength);
        }
    }

    // private
    , CheckCorrectParamLength: function (parm, maxLength) {
        if (parm && parm.length && parm.length > maxLength && parm.substr) {
            return parm.substr(0, maxLength);
        }
        return parm;
    }

    // public
    , GetVisitorId: function () {
        var savedId = _dlMiscHelper.GetCookie('vid');
        if (savedId && savedId.length > 0) { _dlMiscHelper.SetCookie('vid', savedId, 365 * 5); return savedId; }

        savedId = _dlMiscHelper.GenerateShortGuid();
        _dlMiscHelper.SetCookie('vid', savedId, 365 * 5);
        return savedId;
    }

    // public
    , locationTypes: {
        country: "country"
        , administrative_area_level_1: "administrative_area_level_1"
        , administrative_area_level_2: "administrative_area_level_2"
        , administrative_area_level_3: "administrative_area_level_3"
        , locality: "locality"
        , sublocality: "sublocality"
        , postal_town: "postal_town"
        , neighborhood: "neighborhood"
        , route: "route"
        , street_number: "street_number"
        , postal_code: "postal_code"
        , premise: "premise"
        , street_address: "street_address"
        , subpremise: "subpremise"
    }

    // public
    , geocodeStatuses: {
        "ERROR": "ERROR"
        , "INVALID_REQUEST": "INVALID_REQUEST"
        , "OK": "OK"
        , "OVER_QUERY_LIMIT": "OVER_QUERY_LIMIT"
        , "REQUEST_DENIED": "REQUEST_DENIED"
        , "UNKNOWN_ERROR": "UNKNOWN_ERROR"
        , "ZERO_RESULTS": "ZERO_RESULTS"
        , "MAX_WAYPOINTS_EXCEEDED": "MAX_WAYPOINTS_EXCEEDED"
        , "NOT_FOUND": "NOT_FOUND"
    }

    // public
    , doclocStatuses: {
        "OK": "OK"
        , "SERVER_ERROR": "SERVER_ERROR"
        , "ZERO_RESULTS": "ZERO_RESULTS"
    }

    // public
    , logTypes: {
        "Unknown": "Unknown"
        , "InvalidAddress": "InvalidAddress"
        , "ServerError": "ServerError"
        , "NoResults": "NoResults"
        , "ResultsLoad": "ResultsLoad"
        , "PageView": "PageView"
        , "AdditionalLocations": "AdditionalLocations"
        , "DetailsShow": "DetailsShow"
        , "UrlOpen": "UrlOpen"
        , "EmailSend": "EmailSend"
        , "DirectionsShow": "DirectionsShow"
    }
};
