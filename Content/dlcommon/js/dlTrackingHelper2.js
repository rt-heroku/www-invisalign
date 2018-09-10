var _dlTrackingHelper = {
    implementationType: 'eu'
    , _useGA: true
    , _useCustomLogging: true
    , _eventTrackName: 'MobileDocLocator'
    , _trackingCallback: null
    , callbackTypes: {
        "INVALID_ADDRESS": "INVALID_ADDRESS"
        , "SERVER_ERROR": "SERVER_ERROR"
        , "NO_RESULTS": "NO_RESULTS"
        , "RESULTS_OK": "RESULTS_OK"
        , "PAGE_CHANGED": "PAGE_CHANGED"
        , "VIEW_ON_MAP": "VIEW_ON_MAP"
        , "VIEW_ADDITIONAL_LOCATIONS": "VIEW_ADDITIONAL_LOCATIONS"
        , "VIEW_CONTACT_INFO": "VIEW_CONTACT_INFO"
        , "NAVIGATE_WEB_LINK": "NAVIGATE_WEB_LINK"
        , "NAVIGATE_EMAIL_LINK": "NAVIGATE_EMAIL_LINK"
        , "DIRECTIONS_SHOW": "DIRECTIONS_SHOW"
        , "CONTACT_DOCTOR": "CONTACT_DOCTOR"
        , "CONTACT_DOCTOR_SUBMITTED": "CONTACT_DOCTOR_SUBMITTED"
        , "IPD_EVENT": "IPD_EVENT"
        , "IPD_EVENT_SUBMITTED": "IPD_EVENT_SUBMITTED"
    }

    , searchSources: {
        "NAVIGATE": "NAVIGATE"
        , "DIRECT": "DIRECT"
        , "MOBILE_NAVIGATE": "MOBILE_NAVIGATE"
        , "MOBILE_DIRECT": "MOBILE_DIRECT"
    }

    , eventLogMap: {
        "INVALID_ADDRESS": "InvalidAddress"
        , "SERVER_ERROR": "ServerError"
        , "NO_RESULTS": "NoResults"
        , "RESULTS_OK": "ResultsLoad"
        , "PAGE_CHANGED": "PageView"
        , "VIEW_ADDITIONAL_LOCATIONS": "AdditionalLocations"
        , "VIEW_CONTACT_INFO": "DetailsShow"
        , "NAVIGATE_WEB_LINK": "UrlOpen"
        , "NAVIGATE_EMAIL_LINK": "EmailSend"
        , "DIRECTIONS_SHOW": "DirectionsShow"
        , "CONTACT_DOCTOR": "ContactDoctor"
        , "CONTACT_DOCTOR_SUBMITTED": "ContactDoctorSubmitted"
        , "IPD_EVENT": "IpdEvent"
        , "IPD_EVENT_SUBMITTED": "IpdEventSubmitted"
    }

    // public
    , SetEventTrackName: function (name) {
        this._eventTrackName = name;
    }

    , SetTrackingCallback: function (callback) {
        this._trackingCallback = callback;
    }

    , LogEvent: function (viewData, eventType, manualSelectedItem) {

        if (!viewData || !eventType) return;
        try
        {
            var selectedItem = (manualSelectedItem || viewData.item) || null;
            if (!selectedItem) selectedItem = viewData.parentItem || null;

            if (this.eventLogMap[eventType]) {
                var logType = this.eventLogMap[eventType];

                if (logType == 'DetailsShow' && selectedItem && this.AreProfilesEnabled(selectedItem)) { logType = 'BioOpen'; }

                this.LogEventServer(viewData, selectedItem, logType);
                this.GATrack(viewData, selectedItem, logType);
            }

            this.InvokeCallback(viewData, eventType);
        }
        catch (ex) { try { console.log(ex); } catch (e) { } }
    }

    , AreProfilesEnabled: function (item) { return _dlLocaleHelper.GetShowProviderBio() && item.HasProfile; }

    , LogEventServer: function (viewData, selectedItem, logType) {
        
        var searchData = viewData ? (viewData.searchData || viewData.errorSearchData) : null;
        if (!this._useCustomLogging || !logType || !viewData || !searchData) return;

        var searchSource = viewData.fromParams ? this.searchSources.NAVIGATE : this.searchSources.DIRECT;
        if (this._eventTrackName == 'MobileDocLocator') searchSource = viewData.fromParams ? this.searchSources.MOBILE_NAVIGATE : this.searchSources.MOBILE_DIRECT;
        
        var req = {
            logType: logType
            , implementationType: this.implementationType
            , streetAddress: searchData.address || ''
            , postalCode: searchData.postalCode || ''
            , city: searchData.city || ''
            , countryList: searchData.country || ''
            , sessionID: searchData.sessionID || ''
            , contextID: searchData.contextID || ''
            , filter: searchData.filter || ''
            , sort: searchData.sort || ''
            , filterName: searchData.name || ''
            , searchStatus: 200
            , searchType: searchData.searchType || ''
            , searchSource: searchSource
        };

        if (logType == _DocLocAjax.logTypes.ServerError) {
            req.searchStatus = 500;
        }
        else if (logType == _DocLocAjax.logTypes.ResultsLoad || logType == _DocLocAjax.logTypes.PageView || logType == _DocLocAjax.logTypes.AdditionalLocations || logType == _DocLocAjax.logTypes.DetailsShow || logType == _DocLocAjax.logTypes.UrlOpen || logType == _DocLocAjax.logTypes.EmailSend || logType == "DirectionsShow" || logType == "BioOpen" || logType == "ContactDoctor" || logType == "ContactDoctorSubmitted" || logType == "IpdEvent" || logType == "IpdEventSubmitted") {
            req.latitude = searchData.latitude || 0;
            req.longitude = searchData.longitude || 0;
            req.results = viewData.items ? viewData.items.length : 0;
            req.radius = searchData.radius || 0;
            req.effectiveRadius = searchData.effectiveRadius || 0;

            var items = viewData.items;
            if (items && items.length && _dlMiscHelper.IsNumber(viewData.page)) {
                var itemsPerPage = _dlLocaleHelper.GetPagerPageSize() || 10;
                req.startPosition = itemsPerPage * parseInt(viewData.page);
                req.endPosition =  Math.min(req.startPosition + itemsPerPage, items.length) - 1;

                if (logType == _DocLocAjax.logTypes.ResultsLoad || logType == _DocLocAjax.logTypes.PageView || logType == _DocLocAjax.logTypes.AdditionalLocations) {
                    var disaplayedItems = items.slice(req.startPosition, req.endPosition + 1);
                    req.docIdList = this.GetDocIdList(disaplayedItems);
                }
            }
            if (selectedItem) { req.primaryDocId = selectedItem.DocID; }

            if (logType == _DocLocAjax.logTypes.ResultsLoad) {
                req.duration = (searchData.requestTimes && searchData.requestTimes.beginResults && searchData.requestTimes.endResults) ? searchData.requestTimes.endResults - searchData.requestTimes.beginResults : 0;
            }
        }

        _DocLocAjax.LogEvent(req);
    }

    , GTMTrack: function (event, eventLabel) {
        try { if (window['_CommonHelper']) { window['_CommonHelper'].GTMTrackEvent(event, eventLabel); } } catch (ex) { }
    }

    , GetPageItems: function (items, page) {
        var itemsPerPage = _dlLocaleHelper.GetPagerPageSize() || 10;
        var startIdx = page * itemsPerPage; if (startIdx >= items.length) startIdx = 0;
        return items.slice(startIdx, Math.min(startIdx + itemsPerPage, items.length));
    }

    , GATrack: function (viewData, selectedItem, logType) {
        if (!this._useGA) return;

        var arr = ['_trackEvent', this._eventTrackName];
        var len = arr.length;

        if (logType == _DocLocAjax.logTypes.ResultsLoad) { arr.push('DisplayResults'); this.GTMTrack('docloc_search'); }
        else if (logType == _DocLocAjax.logTypes.NoResults) { arr.push('NoResults'); }
        else if (logType == 'DisplayLegend') { arr.push('DisplayLegend'); }
        else if (selectedItem) {
            if (logType == _DocLocAjax.logTypes.DetailsShow) { arr.push('ViewDetails'); arr.push(selectedItem.FullName); this.GTMTrack('docloc_contact_details', selectedItem.FullName); }
            else if (logType == "BioOpen") { arr.push('ViewProfile'); arr.push(selectedItem.FullName); this.GTMTrack('docloc_contact_details', selectedItem.FullName); }
            else if (logType == "DirectionsShow") { arr.push('ViewDirections'); arr.push(selectedItem.FullName); }
            else if (logType == _DocLocAjax.logTypes.EmailSend) { arr.push('EmailClick'); arr.push(selectedItem.FullName); }
            else if (logType == _DocLocAjax.logTypes.UrlOpen) { arr.push('WebClick'); arr.push(selectedItem.FullName); }
        }

        if (arr.length == len) return;

        try {
            if (window['_CommonHelper']) { window['_CommonHelper'].GATrackEvent(arr[1], arr[2], arr[3], arr[4], arr[5]); }
            else if (_gaq) _gaq.push(arr);
        }
        catch (ex) { }
    }

    , GetDocIdList: function (items) {
        if (items && items.length) {
            var arr = [];
            for (var i in items) { arr.push(items[i].DocID); }
            return arr.join(',');
        }
        return '';
    }

    , InvokeCallback: function (viewData, eventType) {

        if (!this._trackingCallback) return;
        this._trackingCallback(viewData.searchData, viewData, eventType);
    }

    , Outp: function (s) { try { console.log(s); } catch (ex) { } }
};

if (!window['_DocLocEU']) window['_DocLocEU'] = _dlTrackingHelper;