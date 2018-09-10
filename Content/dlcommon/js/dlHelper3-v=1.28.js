var _dlHelper = {
    useHashHistory: true
    , useScrollPaging: true
    , initComplete: false
    , annotationMap: {}
    , checkRepeatExec: { _m: {}, executeWithCheck: function (key, func) { try { var d = this._m[key]; if (!d || (new Date().getTime() - d.getTime() > 1000)) { this._m[key] = new Date(); func(); } } catch (ex) { func(); } } }
    , viewData: null
    , viewDatasCache: {}
    , contactItems: []
    , contactRedirUrl: null
    , contactConfirmUrl: null
    , sourceCountry: 'en'
    , sourceLanguage: 'en'
    , useEmbeddedContactForm: true
    , fieldData: [
        { elementId: 'txtFirstName', rules: [{ type: 'required', labelId: 'cf-copy-lbl_firstname_req' }] }
        , { elementId: 'txtLastName', rules: [{ type: 'required', labelId: 'cf-copy-lbl_lastname_req' }] }
        , { elementId: 'txtEmail', rules: [{ type: 'required', labelId: 'cf-copy-lbl_email_req' }, { type: 'regexp', pattern: /^\w+([-+.\']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, labelId: 'cf-copy-lbl_email_regex' }] }
        , { elementId: 'txtPhoneNumber', rules: [{ type: 'required', labelId: 'cf-copy-lbl_phone_req' }] }
        , { elementId: 'ddlDay', rules: [{ type: 'required', labelId: 'cf-copy-lbl_datebirth_req' }] }
        , { elementId: 'ddlMonth', rules: [{ type: 'required', labelId: 'cf-copy-lbl_datebirth_req' }] }
        , { elementId: 'ddlYear', rules: [{ type: 'required', labelId: 'cf-copy-lbl_datebirth_req' }] }
        , { elementId: 'privacy_accept', type: "checkbox", rules: [{ type: 'required' }] }
        , { elementId: 'g-recaptcha-response', rules: [{ type: 'required', labelId: 'err_recaptcha' }, { type: 'server', code: '500', labelId: 'err_recaptcha' }] }
    ]

    , Start: function () {
        _dlTrackingHelper.SetEventTrackName(this.IsMediumSmallScreen() ? 'MobileDocLocator' : 'DocLocator'); _dlControllerHelper._trackAfterDetailsPane = false;
        this.InitResources(); this.InitTemplates(); this.InitMainContent(); this.InitControls(); this.InitContactForm(); this.InitAcceptLanguage(); this.InitJHash(); this.InitMiscData(); this.InitController(); this.initComplete = true;
    }

    // init helpers

    , InitResources: function () {  _dlMiscHelper.InitResObj(_dlRes || {}); }
    , InitMainContent: function () { $('#content').html($.render['mainTemplate'](this)); }
    , InitController: function () { var p = this; _dlControllerHelper.SetRenderCallback(function (data) { p.RenderCallback(data); }); _dlControllerHelper.SetProcessingCallback(function (processing) { if (processing) { $('#dlLoading').show(); } else { $('#dlLoading').hide(); } }); this.SetInputParameters(); }
    , InitJHash: function () { var p = this; jHash.change(function () { p.HashChangeHandler(); }); }
    , InitMiscData: function () { for (var i in this.annotationData) { this.annotationMap[this.annotationData[i].ann] = this.annotationData[i]; var alt = _dlMiscHelper.ResDef('annotation_' + this.annotationData[i].ann, null); if (alt) { this.annotationData[i].alt = alt; } } }

    , InitTemplates: function () {
        var p = this, templates = {};
        $.each(['headerTemplate', 'resultsTemplate', 'contactItemsTemplate', 'miniInfoTemplate', 'infoWindowTemplate', 'detailsTemplate', 'pagerTemplate', 'resultsInfoTemplate', 'infoBoxTipTemplate', 'directionsAddressTemplate', 'mapCenterInfoWindowTemplate', 'directionsInfoWindowTemplate', 'directionsTemplate', 'legendTemplate', 'mainTemplate'], function (idx, it) { if ($('#' + it).size() == 0) { return; } p[it] = $('#' + it).html(); templates[it] = { markup: p[it], allowCode: true }; });
        $.templates(templates);
    }

    , InitControls: function () {
        var p = this;
        var conf = _dlLocaleHelper.GetConfiguration(); if (conf && conf.fixedCityItems) { var cs = $('<select id="srchCity"><option value=""></option></select>'); for (var n in conf.fixedCityItems) { cs.append('<option value="' + n + '">' + conf.fixedCityItems[n] + '</option>'); $('#srchCity').replaceWith(cs); } }

        this._delayScrollForMap = new _DalayOnce(function () { p.HandleScrollForMap(); }, 500);
        $('#srchCountry').change(function () { p.CheckEnablePostalCode(); });
        $('#srchPostalCode,#srchAddress,#srchCity,#srchName,#srchCompanyName,#srchPostalCodeCity').keypress(function (event) { if (event.which == 13) { event.preventDefault(); p.DoSearch(); } });
        $('#srchSearch').click(function () { p.DoSearch(); });
        $('#srchNewSearch,#srchNewSearchBottom,#dlLinkToSearchReset').click(function () { p.DoNewSearch(); });
        $('#dlLinkToSearch').click(function () { p.DoHideDirections(); });
        $('#srchExperienceRef,#srchDistanceRef').change(function () { p.DoSortChange(); });
        if (_dlLocaleHelper.GetHidePostalCode()) { $('#tdPostalCode1,#tdPostalCode2,#tdPostalCode3,#tdPostalCode4').hide(); $('#tdPostalCode4').closest('table').width('66%'); }
        if (this.useScrollPaging) this.SetResultsScrollHandler();
        $('#lightbox01,#lightbox02').attr('onclick', 'return _CommonHelper.ShowPopupFromLink(this, { "width": 270, "height": 360, "padding": 30 })');

        try { var c = _dlMiscHelper.GetCookie('_saHash'); if (c) { $('#sa_hash').val(c); } } catch (ex) { }
        try { var parms = _dlMiscHelper.GetUrlParameters(); if (parms['type'] == 'teen' || window['_pageParams'] && window['_pageParams'].type == 'teen') { var d = $('#adult-teen-container').detach(); d.insertAfter($('#srchCountryContainer')); } } catch (ex) { }
    }

    , CheckSVGTMEvent: function (eventLabel) {
        try {
            var saHash = _dlMiscHelper.GetCookie('_saHash');
            if (!saHash) return;

            var saType = _dlMiscHelper.GetCookie('_saType');
            if (!saType) { saType = 'sa'; }

            if (window['_CommonHelper']) { window['_CommonHelper'].GTMTrackEvent(saType == 'sa' ? 'SmileAssessment' : 'SmileSimulation', saType + '_' + eventLabel); }
        }
        catch (ex) { };
    }

    , InitContactForm: function () {
        var p = this;
        $('#hidImplementationType').val('eu');
        $('#hidSourceCountry').val(this.sourceCountry || 'en');
        $('#hidSourceLanguage').val(this.sourceLanguage || 'en');
        var setBirthDate = function () { var d = $('#ddlDay').val(); var m = $('#ddlMonth').val(); var y = $('#ddlYear').val(); if (!d || !m || !y) return false; var dt = new Date(parseInt(y), parseInt(m) - 1, parseInt(d)); if (!dt) return false; $('#hidDateBirth').val(dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate()); return true; };

        $('#cf-email-form').formhelper({
            fieldData: this.fieldData, submitId: 'cf-copy-submit', submitUrl: this.submitUrl, returnUrl: this.contactRedirUrl, loadAnimationId: 'imgloading'
            , showLabel: function (lbl) { lbl.slideDown(100); }
            , hideLabel: function (lbl) { lbl.slideUp(100); }
            , preValidate: function (sender, data) { if (p.contactItems.length == 0) return false; setBirthDate(); $('#hidDocId').val(p.contactItems[0].DocID); var listVal = ''; if (p.contactItems.length > 1) { listVal = $.map(p.contactItems.slice(1), function (e) { return e.DocID; }).join(','); } $('#hidDocIdList').val(listVal); return true; }
            , postFieldValidate: function (sender, data) { p.HandleContactFieldValidate(sender, data); }
            , postValidate: function () { }
            , postSubmit: function (sender, data) {
                if (data.code == '200') {
                    var trackName = p.IsMediumSmallScreen() ? 'MobileDocLocator' : 'DocLocator';
                    for (var i = 0; i < p.contactItems.length; i++) {
                        var it = p.contactItems[i];
                        _CommonHelper.GATrackPage('/ContactDoctor/Submitted/' + it.FullName);
                        _CommonHelper.GATrackEvent(trackName, 'ContactDoctor', it.FullName);
                        try { _CommonHelper.GTMTrackEvent('appointment_requested_complete', it.FullName); } catch (ex) { }
                    }
                    p.TrackContactFormSubmitted2();
                    if (p.contactConfirmUrl) { var obj = { request_hash: data.parms.hash, title: $('#txtTitle').val(), first_name: $('#txtFirstName').val(), last_name: $('#txtLastName').val(), email: $('#txtEmail').val(), date_birth: $('#hidDateBirth').val() }; var u = p.contactConfirmUrl + (p.contactConfirmUrl.indexOf('?') >= 0 ? '&' : '?'); for (var n in obj) { u += n + '=' + encodeURIComponent(obj[n]) + '&'; } window.setTimeout(function () { window.location.href = u; }, 200); }
                    else { $('#cf-sendemail-step').hide(); $('#cf-thankyou-step').show(); }
                }
                else { try { grecaptcha.reset(); } catch (ex) { } }
            }
        });
    }

    , HandleContactFieldValidate: function (sender, data) {
        var fieldData = data.field; var fieldElement = sender.GetFieldElement(data.field); if (!fieldElement) return;
        var parent = fieldElement.parent();
        if (sender.IsFieldValid(data.field)) { parent.removeClass('has-error'); }
        else { parent.addClass('has-error'); }
    }

    , InitAcceptLanguage: function () {
        var p = this;
        var initAcceptLanguage = function (acceptLanguage) { _dlLocaleHelper.SetCurrentCountryDataByAcceptLanguage(acceptLanguage); if (!p.viewData || p.viewData.view == _dlControllerHelper._views.search) { $('#srchCountry').val(_dlLocaleHelper.GetCountryCodeLower()).change(); } }
        
        var acceptLanguage = _dlMiscHelper.GetCookie('acceptLanguage');
        if (acceptLanguage && acceptLanguage != '') { acceptLanguage = acceptLanguage.split(','); initAcceptLanguage(acceptLanguage); return; }
        
        _DocLocAjax.GetMiscData({
            callback: function (browserData, status) {
                if (status == _DocLocAjax.doclocStatuses.OK) {
                    if (browserData && browserData.AcceptLanguages) {
                        _dlMiscHelper.SetCookie('acceptLanguage', browserData.AcceptLanguages.join(','));
                        acceptLanguage = browserData.AcceptLanguages;
                        initAcceptLanguage(acceptLanguage);
                    }
                }
            }
        });
    }

    , SetResultsScrollHandler: function () { var p = this; $('#dlResultList').scroll(function (ev) { if (p.skipNextScroll) { p.skipNextScroll = false; return; } p.HandleResultsScroll(ev); }); }
    , ExecWithoutResultsScrollHandler: function (f) { this.skipNextScroll = true; try { f(); } catch (ex) { } }

    // display helpers

    , SwitchToView: function (view) {
        if (view == _dlControllerHelper._views.search) { this.ShowDirectionsContainer(false); this.ShowResultsContainer(false); this.ShowSearchContainer(true); this.ShowSearchBoxContainer(true); }
        else if (view == _dlControllerHelper._views.results || view == _dlControllerHelper._views.details) { this.ShowDirectionsContainer(false); this.ShowSearchBoxContainer(false); this.ShowSearchContainer(true); this.ShowResultsContainer(true); }
        else if (view == _dlControllerHelper._views.directions) { this.ShowSearchContainer(false); this.ShowDirectionsContainer(true); }
    }

    , ShowDirectionsContainer: function (show) { this.SafeShowElement('#dlDirectionsPane', show); }
    , ShowSearchContainer: function (show) { this.SafeShowElement('#dlSearchPane', show); }
    , ShowResultsContainer: function (show) { this.SafeShowElement('#dlResultsPanel', show); }
    , ShowSearchBoxContainer: function (show) { this.SafeShowElement('#dlSearchBox', show) }

    // view render helpers

     , RenderCallback: function (data) {

         if (this._delayScrollForMap) this._delayScrollForMap.Cancel();
         this.viewData = data;
         if (this.viewData.error) this.OutputError(this.viewData.error);

         var view = this.viewData.view;
         if (this['Render_' + this.viewData.view]) this['Render_' + this.viewData.view]();
         this.SwitchToView(view);
         this.SetHashParameters();
     }

    , Render_search: function () {
        var st = this.viewData.state; var reset = this.viewData.reset; if (!this._firstSearchRender) { this._firstSearchRender = true; reset = false; }
        $('#srchCountry').val(st.country).change();
        if (reset) { $('#srchPostalCode,#srchAddress,#srchCity,#srchName,#srchCompanyName,#srchPostalCodeCity').val(''); this.SafeCheckRadio('#srchAdults'); $('#srchItero').prop('checked', false); if (!_dlLocaleHelper.GetDistanceForDefaultSort()) { $('#srchExperienceRef0').prop('checked', true); } }
        else { $('#srchPostalCode').val(st.postalCode); $('#srchAddress').val(st.address); $('#srchCity').val(st.city); $('#srchPostalCodeCity').val(this.SafeJoin(', ', [st.postalCode, st.city])); var parts = (st.name || '').split('|'); $('#srchName').val(parts[0]); $('#srchCompanyName').val(parts[1] || ''); $(st.type == 'adult' ? '#srchAdults' : '#srchTeen').prop('checked', true); $('#srchItero').prop('checked', st.itero == '1' ? true : false); $(st.sort == 'e' ? '#srchExperienceRef0' : '#srchDistanceRef0').prop('checked', true); }

        var p = this;
        if (this.IsMediumSmallScreen()) { window.setTimeout(function () { p.ScrollToElement($('#dlSearchBox h1')); }, 100); }
    }

    , Render_results: function () {
        var st = this.viewData.state, p = this;
        $(st.sort == 'e' ? '#srchExperienceRef' : '#srchDistanceRef').prop('checked', true);

        var prevViewData = this.viewDatasCache['results'];

        if (prevViewData && prevViewData.searchData.searchKey == this.viewData.searchData.searchKey && prevViewData.state.docId == this.viewData.state.docId) {
            if (this.resultsRenderData && this.viewData.page === this.resultsRenderData.currentScrollPage) return;
        }

        $('#dlMiniInfo').html('');
        this.viewDatasCache['results'] = this.viewData;
        var obj = { state: st, allItems: this.viewData.items, pagerData: this.GetPagerData(this.viewData.page, this.viewData.items.length), searchType: this.viewData.searchData.searchType, location: this.ReplaceDirectionsAddressCountry(this.viewData.searchData.formattedAddress), results: this.viewData.items.length, num: this.viewData.items.length, FullName: this.viewData.parentItem ? this.viewData.parentItem.FullName : '', lastRenderedPage: 0, currentScrollPage: this.viewData.page, useScrollPaging: this.useScrollPaging };
        this.resultsRenderData = obj;

        if (st.docId) { $('#dlSortPanel').hide(); $('#dlBackPanel').show(); } else { $('#dlSortPanel').show(); $('#dlBackPanel').hide(); }
        $('#pagination,#pagination-bottom').html($.render['pagerTemplate'](obj));
        $('#dlMapHeaderLabel').html($.render['headerTemplate'](obj));
        if (this.useScrollPaging) { this.CheckRenderNextResultItems(this.viewData.page, true); }
        else {
            this.resultsRenderData.items = this.GetPageItems(this.viewData.items, this.viewData.page, this.viewData.page);
            this.resultsRenderData.mapItems = this.resultsRenderData.items.slice(0);
            this.resultsRenderData.renderedItems = this.resultsRenderData.items.slice(0);

            $('#dlResultList').html($.render['resultsTemplate'](obj));
            if (_dlMiscHelper.IsLegacyIE()) { window.setTimeout(function () { p.RenderMapPane(); }, 50); } else { p.RenderMapPane(); }
        }

        this.ScrollToResultsTop();
    }

    , Render_details: function () {
        var p = this, item = this.viewData.item;
        var cleanUp = function () { _dlControllerHelper.SetStateResults({}); };
        //window.setTimeout(cleanUp, 500);

        var opts = { width: Math.min(400, $(window).width() - 40), height: 250, onclose: function () { cleanUp(); } };
        if (this.AreTabsEnabled(item)) {
            
            var url = _dlLocaleHelper.GetProviderBioUrl(item.DocID, item.FullName, this.viewData.searchData.contextID);
            if (url && url.length) {
                var isiPad = navigator.userAgent.match(/iPad/i);
                if (isiPad || this.IsMediumScreen()) { window.open(url, '_blank'); window.setTimeout(cleanUp, 500); return; }

                opts.width = 1000; opts.height = 700; opts.url = url;
            }
            else { opts.content = $.render['detailsTemplate'](item); }
        }
        else { opts.content = $.render['detailsTemplate'](item); }
        this.ShowPopup(opts);
    }

    , Render_directions: function () { var p = this; if (_dlMiscHelper.IsLegacyIE()) { window.setTimeout(function () { p.RenderDirectionsPaneInner(); }, 50); } else { p.RenderDirectionsPaneInner(); } }
    , RenderDirectionsPaneInner: function () {

        var p = this, item = this.viewData.item, directionsData = this.viewData.directionsData, directions = this.viewData.directions, searchData = this.viewData.searchData;
        var leg = this.GetRouteLeg(directions);
        var steps = this.GetRouteSteps(directions);
        if (!leg || !steps) return;

        var startAddress = (directionsData.directionsOrigin != searchData.formattedAddress) ? leg.start_address : directionsData.directionsOrigin;
        startAddress = this.ReplaceDirectionsAddressCountry(startAddress);
        var endAddress = $.render['directionsAddressTemplate'](item);

        $('#dlDirectionsL2').html(startAddress);
        $('#dlDirectionsL4').html(endAddress);
        $('#dlDirectionsMapHeader').html(_dlMiscHelper.ApplyTemplate(_dlMiscHelper.Res('directionsMapHeader'), { duration: leg.duration.text, distance: leg.distance.text, steps: steps.length }));

        var stepItems = [];
        stepItems.push({ num: 0, itemLabel: startAddress, first: true, latlon: steps[0].start_location });
        for (var i in steps) { stepItems.push({ num: Number(i) + 1, itemNo: Number(i) + 1, itemLabel: steps[i].instructions, itemDistance: steps[i].distance.text, normal: true, latlon: steps[i].start_location }); }
        stepItems.push({ num: steps.length + 1, itemLabel: endAddress, last: true, latlon: steps[steps.length - 1].end_location });

        $('#dlDirectionsStepsContainer').html($.render['directionsTemplate']({ items: stepItems }));

        var mapOptions = { center: new google.maps.LatLng(searchData.latitude, searchData.longitude), zoom: _dlLocaleHelper.GetDefaultMapZoom() };
        if (this.directionsMapHelper == null) {
            this.directionsMapHelper = new _dlMapHelper();
            this.directionsMapHelper.CreateMap({
                elementId: '#dlDirectionsMap', mapOptions: { center: new google.maps.LatLng(searchData.latitude, searchData.longitude) }, openInfoWindowOnMarkerSelect: true, selectMarkerOnMouseOver: false, deselectMarkerOnMouseOut: false, deselectMarkerOnInfoBoxClose: true, closeInfoWindowOnMarkerDeselect: true
                , callback: function (data) { }
                , infoBoxOptions: { pixelOffset: new google.maps.Size(-148, -326), maxWidth: 325, infoBoxClearance: new google.maps.Size(20, 20), boxStyle: this.GetDefaultIBBoxStyle(), closeBoxMargin: "4px 4px 0px 0px", closeBoxURL: "https://www.google.com/intl/en_us/mapfiles/close.gif" }
            });
        }
        else { this.directionsMapHelper.SetMapOptions(mapOptions); }
        this.directionsMapHelper.HandleResize();
        this.directionsMapHelper.ShowDirections({ directionsResults: directions });

        this.SetDirectionsRowsHandlers(stepItems);

        var markerConfig = this.GetCenterMarkerConfigData(), itemMarkerConfig = this.GetMarkerConfigData(item, true);
        var f = function (step, title, start) { return { MarkerIcon: markerConfig.icon, MarkerShadow: markerConfig.shadow, MarkerTitle: title, InfoBoxTemplate: 'mapCenterInfoWindowTemplate', Latitude: (start ? step.start_location : step.end_location).lat(), Longitude: (start ? step.start_location : step.end_location).lng(), infoBoxOptions: p.GetInfoBoxOptionsForCenter(!start), InfoBoxTipTemplate: 'infoBoxTipTemplate' } };

        var markerItems = [ f(steps[0], startAddress, true), $.extend({}, f(steps[steps.length - 1], endAddress, false), { MarkerIcon: itemMarkerConfig.icon, MarkerShadow: itemMarkerConfig.shadow }) ];
        this.directionsMapHelper.AddMarkers({ items: markerItems, fitBounds: false, hideInfoBox: true, dontUseTooltip: true });
    }

    // map helpers

    , RenderMapPane: function () {

        var p = this, items = this.resultsRenderData.mapItems.slice(0), searchData = this.viewData.searchData;
        if (this.viewData.searchData.searchType != _dlDataHelper.prototype.searchTypes.COUNTRY) { items.unshift(this.FormatObjectForCenterMarker(this.viewData.searchData.formattedAddress, searchData.latitude, searchData.longitude)); }

        var openInfoWindowOnMarkerSelect = !this.IsSmallScreen();
        var mapOptions = { center: new google.maps.LatLng(searchData.latitude, searchData.longitude), zoom: _dlLocaleHelper.GetDefaultMapZoom(), openInfoWindowOnMarkerSelect: openInfoWindowOnMarkerSelect };
        if (this.mapHelper == null) {
            this.mapHelper = new _dlMapHelper();
            this.mapHelper.CreateMap({
                elementId: '#dlMap', mapOptions: { center: new google.maps.LatLng(searchData.latitude, searchData.longitude) }, openInfoWindowOnMarkerSelect: openInfoWindowOnMarkerSelect, selectMarkerOnMouseOver: true, deselectMarkerOnMouseOut: false, deselectMarkerOnInfoBoxClose: true, closeInfoWindowOnMarkerDeselect: true
                , infoBoxOptions: { pixelOffset: new google.maps.Size(-148, -326), maxWidth: 325, infoBoxClearance: new google.maps.Size(20, 20), boxStyle: this.GetDefaultIBBoxStyle(), closeBoxMargin: "4px 4px 0px 0px", closeBoxURL: "https://www.google.com/intl/en_us/mapfiles/close.gif" }
                , callback: function (data) { p.MapHelperCallback(data); }
                , dragEnd: function () { p.HandleMapDragend(p.mapHelper.GetMapCenter()); }
            });
        }
        else { this.mapHelper.SetMapOptions(mapOptions); this.mapHelper.options.openInfoWindowOnMarkerSelect = openInfoWindowOnMarkerSelect; }

        this.mapHelper.HandleResize();
        this.mapHelper.AddMarkers({ items: items, fitBounds: true, hideInfoBox: true });
    }

    , IsSmallScreen: function () { return $(window).width() <= 500; }
    , IsMediumSmallScreen: function () { return $(window).width() <= 767; }
    , IsMediumScreen: function () { return $(window).width() <= 1000; }

    , MapHelperCallback: function (data) {
        var p = this;
        if (data.type == 'marker') {
            if (data.show && data.marker && data.marker._associatedItem) {
                this.highlightedItem = data.marker._associatedItem;
                window.setTimeout(function () { p.CheckSetIBTabs(p.highlightedItem); }, 20);
                this.ChangeRowSelected(this.highlightedItem, true);

                if (this.IsSmallScreen() && this.highlightedItem.DocID) { $('#dlMiniInfo').html($.render['miniInfoTemplate'](this.highlightedItem)); }
            }
            else if (!data.show) {
                this.highlightedItem = null;
                for (var i = 0; i < this.resultsRenderData.renderedItems.length; i++) { var item = this.resultsRenderData.renderedItems[i]; this.ChangeRowSelected(item, false); }
            }
        }
        else if (data.type == 'infobox_domready') { this.CheckSetIBTabs(this.highlightedItem); }
        else if (data.type == 'center_move') {

            if (data.marker) { this.HandleMapDragend(data.marker.getPosition(), true); }
        }
    }

    , CheckSetIBTabs: function (item) {
        if (item && this.AreTabsEnabled(item)) {
            var setTabs = function () { var jq = $('#dlInfoWindow' + item.DocID); if (jq.size()) { if (!jq.hasClass('ui-tabs')) { jq.tabs({ selected: 0 }); } return true; } };
            if (setTabs()) return;
            var timer = 0, count = 0;
            timer = window.setInterval(function () { if (++count >= 20 || setTabs()) { clearInterval(timer); } }, 20);
        }
    }

    , FormatObjectForCenterMarker: function (markerTitle, latitude, longitude) {
        var markerConfig = this.GetCenterMarkerConfigData();
        return { MarkerTitle: markerTitle, MarkerIcon: markerConfig.icon, MarkerShadow: markerConfig.shadow, InfoBoxTemplate: 'mapCenterInfoWindowTemplate', Latitude: parseFloat(latitude), Longitude: parseFloat(longitude), infoBoxOptions: this.GetInfoBoxOptionsForCenter(), InfoBoxTipTemplate: 'infoBoxTipTemplate', draggable: this.MapDraggingAllowed() };
    }

    , HandleMapDragend: function (mapCenter, ignoreCurrentBounds) {
        var p = this;
        var innerFunc = function () {
            if (!p.MapDraggingAllowed()) return;
            var fixedRadius = 20;

            var searchCenter = new google.maps.LatLng(p.viewData.searchData.latitude, p.viewData.searchData.longitude);
            var spherical = google.maps.geometry.spherical; var offset = /*Math.min(fixedRadius, p.viewData.searchData.effectiveRadius)*/ parseFloat(p.viewData.searchData.effectiveRadius) * 1000 * 1.5; var north = spherical.computeOffset(searchCenter, offset, 0); var west = spherical.computeOffset(searchCenter, offset, -90); var south = spherical.computeOffset(searchCenter, offset, 180); var east = spherical.computeOffset(searchCenter, offset, 90);
            var bounds = new google.maps.LatLngBounds(new google.maps.LatLng(south.lat(), west.lng()), new google.maps.LatLng(north.lat(), east.lng()));
            
            if (!bounds.contains(mapCenter) || ignoreCurrentBounds) {
                _dlControllerHelper.SetStateResults({ latitude: mapCenter.lat(), longitude: mapCenter.lng(), inputRadius: fixedRadius, city: '', postalCode: '', address: '', page: 0 });
            }
        };
        window.setTimeout(innerFunc, 500);
    }

    , MapDraggingAllowed: function () { return !(!this.viewData || !this.viewData.searchData || this.viewData.view != _dlControllerHelper._views.results || this.viewData.searchData.searchType == _dlDataHelper.prototype.searchTypes.COUNTRY || this.viewData.state.docId); }
    , GetInfoBoxOptionsForCenter: function (forItemIcon) { var boxStyle = this.GetDefaultIBBoxStyle(); boxStyle.width = '230px'; return { pixelOffset: forItemIcon ? new google.maps.Size(-100, -138) : new google.maps.Size(-108, -122), boxStyle: boxStyle }; }
    , GetInfoBoxOptionsForDirection: function () { var boxStyle = this.GetDefaultIBBoxStyle(); boxStyle.width = '320px'; return { pixelOffset: new google.maps.Size(-161, -96), boxStyle: boxStyle }; }
    , GetDefaultIBBoxStyle: function () { var unk; return { opacity: unk, width: "325px", backgroundColor: '#FFFFFF', border: '1px solid rgb(204,204,204)', borderRadius: '10px' }; }

    // marker helpers

    , GetCombinedMarkerIconUrl: function (item, selected) { return this.GetImagesBaseFolder() + "combined_marker.png"; }
    , GetMarkerIconData: function (item, selected) { return { url: this.GetCombinedMarkerIconUrl(item, selected), anchor: { x: 3, y: 49 }, origin: { x: 0, y: selected ? 49 : 0 }, size: { width: 38, height: 49 } }; }
    , GetMarkerConfigData: function (item, selected) { var data = { icon: this.GetMarkerIconData(item, selected) , shadow: { url: this.GetImagesBaseFolder() + 'shadow.png', anchor: { x: 0, y: 32 } } }; return data; }
    , GetCenterMarkerConfigData: function () { var data = { icon: { url: this.GetImagesBaseFolder() + 'red-pushpin.png', anchor: { x: 10, y: 31 } } , shadow: { url: this.GetImagesBaseFolder() + 'msmarker.shadow.png', anchor: { x: 16, y: 32 } } }; return data; }
    , GetMarkerForItem: function (item) { return this.mapHelper.FindMarker(function (idx, m) { return (m && m._associatedItem && m._associatedItem.DocID == item.DocID); }); }

    // misc view render helpers

    , GetPageItems: function (items, startPage, endPage) {
        var itemsPerPage = this.GetPagerSize();
        var startIdx = startPage * itemsPerPage; if (startIdx >= items.length) startIdx = 0;
        var itemsPart = items.slice(startIdx, Math.min(startIdx + (endPage - startPage + 1) * itemsPerPage, items.length));
        var p = this; $.each(itemsPart, function (idx, it) { p.FormatItemAnnotations(it); p.FormatItemForMap(it); });
        return itemsPart;
    }

    , FormatItemAnnotations: function (item) {
        for (var annIdx = 0; annIdx < 6; annIdx++) { item['a' + annIdx + 'Img'] = null; item['a' + annIdx + 'Alt'] = null; }
        if (item.AnnotationList && item.AnnotationList != '') {
            var annIdx = 0; var annList = item.AnnotationList.split(','); var annArr = [];
            for (var i in annList) { if (this.annotationMap[annList[i]]) { var annData = this.annotationMap[annList[i]]; annArr[annData.pri] = annData; } }
            for (var i in annArr) { if (annArr[i]) { item['a' + annIdx + 'Img'] = annArr[i].img; item['a' + annIdx + 'Alt'] = annArr[i].alt; annIdx++; } }
        }
    }

    , FormatItemForMap: function (item) { var markerConfig = this.GetMarkerConfigData(item, false); var markerSelectedConfig = this.GetMarkerConfigData(item, true); item.MarkerTitle = item.FullName; item.MarkerIcon = markerConfig.icon; item.MarkerShadow = markerConfig.shadow; item.MarkerSelectedIcon = markerSelectedConfig.icon; item.MarkerSelectedShadow = markerSelectedConfig.shadow; item.InfoBoxTemplate = 'infoWindowTemplate'; item.InfoBoxTipTemplate = 'infoBoxTipTemplate'; item.infoBoxOptions = { pixelOffset: new google.maps.Size(-148, this.AreTabsEnabled(item) ? -372 : -327), boxStyle: this.GetDefaultIBBoxStyle() }; }
    , AreTabsEnabled: function (item) { return _dlLocaleHelper.GetShowProviderBio() && item.HasProfile; }

    , ReplaceDirectionsAddressCountry: function (addr) {
        if (!addr || !addr.length) return addr;
        var map = { 'Frankreich': 'FR', 'France': 'FR', 'Deutschland': 'DE', 'Germany': 'DE', 'UK': 'GB', 'Italy': 'IT', 'Italia': 'IT', 'España': 'ES', 'Spain': 'ES', 'Ireland': 'IE', 'Austria': 'AT', 'Österreich': 'AT', 'Switzerland': 'CH', 'Schweiz': 'CH' };
        for (var n in map) { var re = new RegExp(n + '$', 'i'); addr = $.trim(addr); addr = addr.replace(re, map[n]); }
        return addr;
    }

    , GetPagerData: function (page, itemsCount) {
        var itemsPerPage = this.GetPagerSize();
        var pagesInNavigation = _dlLocaleHelper.GetPagerPagesInNavigation() || 10;
        var pageCount = Math.ceil(itemsCount / itemsPerPage);
        if (pageCount <= 0) pageCount = 1;
        if (page * itemsPerPage >= itemsCount) page = 0;
        var startPage = Math.max(page - Math.floor(pagesInNavigation / 2), 0);
        var endPage = Math.min(startPage + pagesInNavigation - 1, pageCount - 1);
        // correct startPage again
        startPage = Math.max(endPage - pagesInNavigation + 1, 0);
        var getPagerItemData = function (pageN) { return { selected: pageN == page, page: pageN } };
        var pageItems = []; for (var i = startPage; i <= endPage; i++) { pageItems.push(getPagerItemData(i)); }
        return { firstResultItem: page * itemsPerPage, lastResultItem: Math.min((page + 1) * itemsPerPage - 1, itemsCount - 1), resultItemsCount: itemsCount, currentPage: page, firstItem: getPagerItemData(0), prevItem: getPagerItemData(Math.max(page - 1, 0)), nextItem: getPagerItemData(Math.min(page + 1, pageCount - 1)), lastItem: getPagerItemData(pageCount - 1), items: pageItems};
    }

    , ChangeRowSelected: function (item, selected) { var rowJ = $('#dlRow' + item.DocID); if (selected) { if (!rowJ.hasClass('highlighted')) rowJ.addClass('highlighted'); } else { rowJ.removeClass('highlighted'); }}

    , HandleRowHover: function (item, mouseOver) {
        if (item != this.highlightedItem) {
            this.ChangeRowSelected(item, mouseOver);
            var marker = this.GetMarkerForItem(item);
            if (marker) this.mapHelper.HighlightMarker(marker, mouseOver);
        }
    }

    , SetDirectionsRowsHandlers: function (stepItems) {
        var p = this;
        var handler = function (type, idx) {
            var stepItem = stepItems[idx];
            if (type == 'mouseover') { if (idx == 0 || idx == stepItems.length - 1) { p.directionsMapHelper.SelectMarker(p.directionsMapHelper.GetMarker(idx == 0 ? 0 : 1), true); }
                else {
                    p.directionsMapHelper.OpenInfoBoxForLatLon({
                        latlon: stepItem.latlon
                        , contents: $.render['directionsInfoWindowTemplate']({ MarkerTitle: stepItem.itemLabel }) + $.render['infoBoxTipTemplate']({})
                        , infoBoxOptions: p.GetInfoBoxOptionsForDirection()
                    });
                }
            }
            else if (type == 'mouseout') { p.directionsMapHelper.CloseInfoBox(); }
            else if (type == 'click') { p.directionsMapHelper.CenterMap(stepItem.latlon); }
        };

        var setHandler = function (idx) {
            var jq = $('#dlStepRow' + idx);
            jq.click(function () { handler('click', idx) }); jq.mouseover(function () { handler('mouseover', idx) }); jq.mouseout(function () { handler('mouseout', idx) });
        };
        for (var i = 0; i < stepItems.length; i++) { setHandler(i); }
    }

    , HandleResultsScroll: function (ev) {
        var resList = $('#dlResultList'), pagerSize = this.GetPagerSize();
        var height = resList.height(), scrollTop = resList.scrollTop(), scrollHeight = resList.prop('scrollHeight');
        if (scrollTop >= scrollHeight - height - 100) { this.CheckRenderNextResultItems(this.resultsRenderData.lastRenderedPage + 1); }

        var visibleIndexes = this.GetResultsVisibleIndexes();
        var lastIdxPage = Math.floor(visibleIndexes[1] / pagerSize);
        if (lastIdxPage != this.viewData.page) { this.resultsRenderData.currentScrollPage = lastIdxPage; _dlControllerHelper.SetStateResultsPage(lastIdxPage); }

        this._delayScrollForMap.Exec();
    }

    , HandleScrollForMap: function () {
        var p = this, pagerSize = this.GetPagerSize(), rd = this.resultsRenderData;
        var resList = $('#dlResultList');
        if ((typeof rd.mapItemsStartIdx == 'undefined') || (typeof rd.mapItemsEndIdx == 'undefined')) { rd.mapItemsStartIdx = this.viewData.page * pagerSize; }
        else {
            var visibleIndexes = this.GetResultsVisibleIndexes();
            if (visibleIndexes[0] >= rd.mapItemsStartIdx && visibleIndexes[1] <= rd.mapItemsEndIdx) { return; }
            rd.mapItemsStartIdx = visibleIndexes[0];
        }

        this.resultsRenderData.mapItemsEndIdx = this.resultsRenderData.mapItemsStartIdx + pagerSize - 1;
        if (rd.mapItemsEndIdx >= rd.renderedItems.length) { rd.mapItemsEndIdx = rd.renderedItems.length - 1; rd.mapItemsStartIdx = Math.max(0, rd.mapItemsEndIdx - pagerSize + 1); }

        rd.mapItems = this.viewData.items.slice(rd.mapItemsStartIdx, rd.mapItemsEndIdx + 1);
        if (_dlMiscHelper.IsLegacyIE()) { window.setTimeout(function () { p.RenderMapPane(); }, 50); } else { p.RenderMapPane(); }
    }

    , GetResultsVisibleIndexes: function () {
        var pos = 0;
        var firstIdx = this.FindIdx(this.resultsRenderData.renderedItems, function (it) { pos = $('#dlRow' + it.DocID).position().top; return pos >= 0; });
        if (firstIdx < 0) return [0, 0];
        
        if (pos > 0 && firstIdx > 0) firstIdx--;
        var lastIdx = firstIdx, resList = $('#dlResultList'), height = resList.height(), scrollTop = resList.scrollTop(), scrollHeight = resList.prop('scrollHeight');
        for (var i = firstIdx + 1; i < this.resultsRenderData.renderedItems.length; i++) {
            pos = $('#dlRow' + this.resultsRenderData.renderedItems[i].DocID).position().top;
            if (pos > height) { break; }
            lastIdx = i;
        }
        return [firstIdx, lastIdx];
    }

    , CheckRenderNextResultItems: function (page, firstRender) {
        if (!this.viewData.items.length) return;

        var resList = $('#dlResultList'), p = this;
        var itemsPerPage = this.GetPagerSize();
        
        if (page * itemsPerPage >= this.viewData.items.length) {
            if (!firstRender) { return; } else { page = 0; } 
        }
        
        var obj = { items: this.GetPageItems(this.viewData.items, firstRender ? 0 : page, page), state: this.viewData.state };
        if (!this.resultsRenderData.renderedItems) this.resultsRenderData.renderedItems = [];
        for (var i = 0; i < obj.items.length; i++) this.resultsRenderData.renderedItems.push(obj.items[i]);

        this.resultsRenderData.lastRenderedPage = page;
        if (firstRender) { resList.html($.render['resultsTemplate'](obj)); this.ScrollToPage(page, true); this.HandleScrollForMap(); } else { resList.append($.render['resultsTemplate'](obj)); }
    }

    , ScrollToPage: function (page, disableScrollHandler) {
        
        var p = this;
        var doScroll = function () {
            p.resultsRenderData.currentScrollPage = page;
            var itemsPerPage = p.GetPagerSize(); var resList = $('#dlResultList');
            var it = $('#dlRow' + p.resultsRenderData.renderedItems[page * itemsPerPage].DocID); resList.scrollTop(resList.scrollTop() + it.position().top);
        };
        if (disableScrollHandler) this.ExecWithoutResultsScrollHandler(doScroll);
        else doScroll();
    }

    , GetRouteLeg: function (directionResults) { var route = directionResults.routes[0]; if (!route || !route.legs || !route.legs.length) { return null; } return route.legs[0]; }
    , GetRouteSteps: function (directionResults) { var leg = this.GetRouteLeg(directionResults); if (!leg || !leg.steps) { return []; } return leg.steps; }

    // hash helpers

    , SetInputParameters: function () {
        var hash = _dlMiscHelper.LTrim(window.location.hash || '', '#'); var hashParms = _dlMiscHelper.GetUrlParameters(hash); var urlParms = _dlMiscHelper.GetUrlParameters(); var parms = $.extend({}, window['_pageParams'] || {}, urlParms, hashParms); _dlControllerHelper.SetStateFromParams(parms);
    }

    , SetHashParameters: function () {
        if (!this.useHashHistory) return;
        var view = this.viewData.view, hash = window.location.hash;
        // not saving the details state
        if (view == _dlControllerHelper._views.details) return;
        // not saving the search state if hash is empty
        if ((window.location.hash == '#' || window.location.hash == '') && view == _dlControllerHelper._views.search) return;
        var hashObj = _dlControllerHelper.SerializeState();
        jHash.set(null, hashObj);
        this.lastSetHash = window.location.hash;
    }

    , HashChangeHandler: function () {
        this.PopupClose();
        var p = this;
        window.setTimeout(function () { var lastSetHash = p.lastSetHash; p.lastSetHash = null; if (lastSetHash && lastSetHash == window.location.hash) return; p.SetInputParameters(); }, 50);
    }

    // profile helpers

    , ParseOHXml: function (xml) {
        var normalizeTime = function (src) {
            var len = src.length;
            var h = '', m = '';
            if (len == 3) { h = src.substr(0, 1); m = src.substr(1, 2); }
            else if (len == 4) { h = src.substr(0, 2); m = src.substr(2, 2); }
            else return src;

            if (_dlLocaleHelper.GetConfiguration().country == 'en') {
                var hn = parseInt(h);
                var am = 'AM';
                if (hn == 0) { h = '12'; }
                else if (hn == 12) { am = 'PM'; }
                else if (hn > 12) { am = 'PM'; h = '' + (hn - 12); }

                return h + ':' + m + ' ' + am;
            }
            return h + ':' + m;
        };

        var obj = { noOH: true, days: [] };
        if (!xml || !xml.length) return obj;

        try {
            xmlDoc = $.parseXML(xml);
        }
        catch (ex) { return obj; }

        var x = $(xmlDoc);

        var root = x.find("data")
        if (root.size() == 0) return obj;

        var noOH = root.attr('noOH');
        if (noOH == 'true') return obj;

        obj.noOH = false;
        var dayNames = [_dlMiscHelper.Res('labelMonday'), _dlMiscHelper.Res('labelTuesday'), _dlMiscHelper.Res('labelWednesday'), _dlMiscHelper.Res('labelThursday'), _dlMiscHelper.Res('labelFriday'), _dlMiscHelper.Res('labelSaturday'), _dlMiscHelper.Res('labelSunday')];
        var days = x.find("day");
        var count = 0;
        days.each(function () {
            var start = $(this).attr('start');
            var end = $(this).attr('end');
            var closed = $(this).attr('closed');

            var d = { start: normalizeTime(start), end: normalizeTime(end), closed: closed && closed == "true" ? true : false, name: dayNames[count++] };
            obj.days.push(d);
        });
        return obj;
    }

    , TruncateStr: function (str, maxChars) {
        if (!str || !str.length) return '';
        if (str.length < maxChars) return str;

        return str.substr(0, maxChars) + '…';
    }

    // UI handlers
    , DoSearch: function () { var und; var combined = this.removeDiacritics($.trim($('#srchName').val())); var cn = this.removeDiacritics($.trim($('#srchCompanyName').val())); if (cn) { combined += '|' + cn; } var obj = { page: 0, sort: $('input:radio[name=srchSort0]:checked').val() || 'e', postalCode: $.trim($('#srchPostalCode').val()), city: $.trim($('#srchCity').val()), address: $.trim($('#srchAddress').val()), country: $.trim($('#srchCountry').val()), name: combined, type: $('input:radio[name=srchType]:checked').val(), itero: $('#srchItero').prop('checked') ? '1' : '0', docId: 0, latitude: '', longitude: '', inputRadius: '' }; if (_dlLocaleHelper.GetCombinedCityPostalCode()) { var vals = this.SplitCityPostalCode($('#srchPostalCodeCity').val()); obj.city = vals[0]; obj.postalCode = vals[1]; } _dlControllerHelper.SetStateResults(obj); }
    , DoCloseInfoMini: function () { $('#dlMiniInfo').html(''); }
    , DoShowDirectionsInputMini: function (id) { $('#dlDirectionsInputMini').val(this.viewData.searchData.formattedAddress); $('#dlDirectionsInputContainerMini').slideDown(); }
    , DoSortChange: function (val) { var obj = { sort: $('input:radio[name=srchSort]:checked').val(), docId: 0, page: 0 }; _dlControllerHelper.SetStateResults(obj); }
    , DoPageChange: function (val) { _dlControllerHelper.SetStateResultsPage(val); }
    , DoNewSearch: function () { _dlControllerHelper.SetStateSearchForm(); }
    , DoAdditionalLocations: function (id) { _dlControllerHelper.SetStateResults({ docId: id, pageAdditional: 0 }); }
    , DoHideAdditionalLocations: function () { _dlControllerHelper.SetStateResults({ docId: 0 }); }
    , DoDetails: function (id) { this.checkRepeatExec.executeWithCheck('details_' + id, function () { _dlControllerHelper.SetStateDetails(id); }); }
    , DoHideDetails: function () { this.PopupClose(); }
    , DoDirections: function (id) { _dlControllerHelper.SetStateDirections(id, $.trim($('#dlDirectionsInput' + id).val())); }
    , DoDirectionsMini: function (id) { _dlControllerHelper.SetStateDirections(id, $.trim($('#dlDirectionsInputMini').val())); }
    , DoHideDirections: function () { _dlControllerHelper.SetStateResults({}); }
    , DoClickResultItem: function (el, id) { var item = this.GetItemById(id); if (!item) { return; } var marker = this.GetMarkerForItem(item); if (!marker) return; this.mapHelper.SelectMarker(marker, true); if (this.IsMediumSmallScreen()) { this.ScrollToResultsTop(); } }
    , DoMouseOverResultItem: function (el, id) { var item = this.GetItemById(id); if (item) this.HandleRowHover(item, true); }
    , DoMouseOutResultItem: function (el, id) { var item = this.GetItemById(id); if (item) this.HandleRowHover(item, false); }
    , DoHandleWebClick: function (id) { var item = this.GetItemById(id); if (!item) { return; } var url = item.Url; var pos = url.toLowerCase().indexOf('http'); if (pos != 0) url = 'http://' + url; _dlTrackingHelper.LogEvent(this.viewData, _dlTrackingHelper.callbackTypes.NAVIGATE_WEB_LINK); window.open(url, '_blank', ''); }
    , DoHandleEmailClick: function (id) { var p = this; window.setTimeout(function () { _dlTrackingHelper.LogEvent(p.viewData, _dlTrackingHelper.callbackTypes.NAVIGATE_EMAIL_LINK); }, 100); }
    , DoShowDirectionsInput: function (id) { $('#dlDirectionsInputContainer' + id).show(); var iwJ = $('#dlInfoWindow' + id); if (!iwJ.hasClass('dlInfoWindowExt')) { $('#dlDirectionsInput' + id).val(this.viewData.searchData.formattedAddress); iwJ.addClass('dlInfoWindowExt'); this.mapHelper.SetInfoBoxOptions({ pixelOffset: new google.maps.Size(-148, iwJ.hasClass('ui-tabs') ? -417 : -372), boxStyle: this.GetDefaultIBBoxStyle() }); this.mapHelper.PanInfoBox(); } }
    , DoShowContactForm: function (id) { this.CopyGTMHiddenFields(); var item = this.GetItemById(id); if (!item) return; this.viewData.focusItem = item; if (this.useEmbeddedContactForm) { this.DoAddItemToContactForm(item); this.CheckSVGTMEvent('show_appointment_form'); return; } var url = _dlLocaleHelper.GetContactFormUrl(); if (!url) return; url += (url.indexOf('?') >= 0) ? '&' : '?'; url += 'name=' + window.encodeURIComponent(item.FullName) + '&did=' + window.encodeURIComponent(item.DocID); this.TrackContactForm(); this.ShowInplacePopupWithUrl(url); }
    , DoAddItemToContactForm: function (item) { if (this.contactItems.length >= 3) { this.OutputError(_dlMiscHelper.Res('contact_select_to_5_msg')); return; } var f = $('#dlContactForm'); f.show(); this.ScrollToElement(f); var ex = $.grep(this.contactItems, function (it) { return it.DocID == item.DocID; }); if (ex && ex.length) return; this.contactItems.push(item); if (this.contactItems.length > 3) { this.contactItems.shift(); } this.DoRenderContactItems(); if (this.contactItems.length == 1) { try { _CommonHelper.GTMTrackEvent('docloc_appt_request', this.contactItems[0].FullName); } catch (ex) { } } }
    , DoRemoveItemFromContactForm: function (id) { var idx = -1; var ex = $.grep(this.contactItems, function (it, x) { if (it.DocID == id) { idx = x; return true; } return false; }); if (idx >= 0) { this.contactItems.splice(idx, 1); this.DoRenderContactItems(); if (this.contactItems.length == 0) { $('#dlContactForm').hide(); this.ScrollToResultsTop(); } } }
    , DoRemoveAllItemsFromContactForm: function () { this.contactItems = []; this.DoRenderContactItems(); $('#dlContactForm').hide(); this.ScrollToResultsTop(); this.CheckSVGTMEvent('appointment_cancel'); }
    , DoRenderContactItems: function () { $('#dlContactItemsList').html($.render['contactItemsTemplate'](this.contactItems)); try { var e = $('.dlContactItem').first().popover(); if (this.contactItems.length == 1) { e.popover('show'); setTimeout(function () { e.popover('hide'); }, 6000); } } catch (e) { } }
    , DoShowIPDForm: function (id) { var item = this.GetItemById(id); if (!item) return; this.viewData.focusItem = item; var url = _dlLocaleHelper.GetIPDFormUrl(); if (!url) return; url += (url.indexOf('?') >= 0) ? '&' : '?'; url += 'name=' + window.encodeURIComponent(item.FullName) + '&did=' + window.encodeURIComponent(item.DocID); this.TrackIPDForm(); this.ShowInplacePopupWithUrl(url); }
    , DoToggleAdvancedSearch: function () { $('#dlAdvancedControls').slideToggle(); $('#dlAdvancedSwitch').toggleClass('expanded'); }
    , ContactFormEnabled: function (item) { if (item.Flags && (item.Flags & 2) == 2) return false; return item.Email && item.Email.length && _dlLocaleHelper.GetConfiguration().showContactForm; }
    , TrackContactForm: function () { if (this.viewData) { _dlTrackingHelper.LogEvent(this.viewData, _dlTrackingHelper.callbackTypes.CONTACT_DOCTOR, this.viewData.focusItem); } }
    , TrackContactFormSubmitted: function () { if (this.viewData) { _dlTrackingHelper.LogEvent(this.viewData, _dlTrackingHelper.callbackTypes.CONTACT_DOCTOR_SUBMITTED, this.viewData.focusItem); } }
    , TrackContactFormSubmitted2: function () { if (this.viewData) { for (var i = 0; i < this.contactItems.length; i++) { _dlTrackingHelper.LogEvent(this.viewData, _dlTrackingHelper.callbackTypes.CONTACT_DOCTOR_SUBMITTED, this.contactItems[i]); } this.CheckSVGTMEvent('appointment_submitted'); } }
    , TrackIPDForm: function () { if (this.viewData) { _dlTrackingHelper.LogEvent(this.viewData, _dlTrackingHelper.callbackTypes.IPD_EVENT, this.viewData.focusItem); } }
    , TrackIPDFormSubmitted: function () { if (this.viewData) { _dlTrackingHelper.LogEvent(this.viewData, _dlTrackingHelper.callbackTypes.IPD_EVENT_SUBMITTED, this.viewData.focusItem); } }
    , DoLegendPopup: function () { var opts = { width: Math.min(680, $(window).width() - 40), height: 700, padding: this.IsMediumSmallScreen() ? 10 : 30 }; opts.content = $.render['legendTemplate']({}); this.ShowPopup(opts); _dlTrackingHelper.GATrack(this.viewData, null, 'DisplayLegend'); }
    , CopyGTMHiddenFields: function () { try { if ($('#dummyForm').size() == 0) { return; } $('#dlContactHiddenContainer').html($('#dummyForm').html()); $('#dummyForm').remove(); } catch (ex) { } }
    , SafeJoin: function (sep, arr) { return $.grep(arr, function (it) { return it; }).join(sep); }

    , DoSearchCurrentPosition: function () {
        var errorMsg = "Cannot acquire your current position.";
        var p = this;
        try {
            var doFallback = function () { };
            var successCallback = function (position) {
                if (_dlMiscHelper.IsNumber(position.coords.latitude) && _dlMiscHelper.IsNumber(position.coords.longitude)) {

                    var obj = { page: 0, sort: 'e', postalCode: '', city: '', address: '', country: $.trim($('#srchCountry').val()), name: '', type: $('input:radio[name=srchType]:checked').val(), itero: '0', docId: 0, latitude: position.coords.latitude, longitude: position.coords.longitude, inputRadius: '' };
                    _dlControllerHelper.SetStateResults(obj);
                }
            };
            var errorCallback = function (error) {
                switch (error.code) {
                    case error.TIMEOUT: doFallback(); break;
                    case error.POSITION_UNAVAILABLE: break;
                    case error.PERMISSION_DENIED: break;
                    case error.UNKNOWN_ERROR: break;
                };
                p.OutputError(errorMsg);
            };
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback, { maximumAge: 60000 });
        }
        catch (ex) { this.OutputError(errorMsg); }
    }

    , SplitCityPostalCode: function (val) {
        var arr = [val || '', '']; if (!val) { return arr; }
        var countryCode = $('#srchCountry').val(); var cd = _dlLocaleHelper.GetCountryDataByCode(countryCode);
        var re = cd ? cd.zipRegex : ''; if (!re) { re = '\\d{3,10}'; }
        re = re.replace(/^\^/i, '').replace(/\$$/i, '');
        var reArr = [re, '\\d{3,10}'];
        for (var i = 0; i < reArr.length; i++) {
            var rexp = new RegExp(reArr[i], 'gi');
            var captarr = []; result = null; while (result = rexp.exec(val)) { captarr.push(result[0]); }
            if (captarr.length) {
                if (!arr[1]) { arr[1] = captarr[0]; }
                var v = arr[0].replace(rexp, ''); v = v.replace(/^\W+/gi, ''); v = v.replace(/\W+$/gi, ''); arr[0] = v;
            }
        }
        return arr;
    }

    // UI helpers
    , ShowPopup: function (opts) { if (window['_CommonHelper']) { window['_CommonHelper'].ShowPopup(opts); } }
    , ShowInplacePopupWithUrl: function(url) { if (window['_CommonHelper']) { window['_CommonHelper'].ShowInplacePopupWithUrl(url); } }
    , OutputError: function (error) { window.setTimeout(function () { alert(error); }, 100); }
    , CheckEnablePostalCode: function () { var countryCode = $('#srchCountry').val(); var cd = _dlLocaleHelper.GetCountryDataByCode(countryCode), pc = $('#srchPostalCode'); if (cd && cd.disablePostalCode) { pc.val('').prop('disabled', true); } else { pc.prop('disabled', false); } if (cd && cd.hidePostalCode) { pc.val(''); pc.closest('div').hide(); } else { pc.closest('div').show(); } }
    , SafeShowElement: function (jqSelector, show) { var j = $(jqSelector); if (show) { if (j.hasClass('dlLeftOff')) j.removeClass('dlLeftOff'); } else { if (_dlMiscHelper.IsBackwardBrowser()) { j.hide(); j.show(); } if (!j.hasClass('dlLeftOff')) j.addClass('dlLeftOff'); } }
    , SafeSelectDropDown: function (id, val) { try { $(id).val(val); } catch (ex) { } }
    , SafeCheckRadio: function (id) { $(id).prop('checked', true); }
    , PopupClose: function () { try { if (window['_CommonHelper']) { window['_CommonHelper'].ClosePopup(); } } catch (ex) { } }
    , ScrollToResultsTop: function () { var p = this; if (p._scrollingRunning) { return; } p._scrollingRunning = true; window.setTimeout(function () { p._scrollingRunning = false; if ($("#results-top").size() && $("#results-top").offset()) { var nav = $('nav'); var diff = 0; if (nav.size() && nav.css('position') == 'fixed') { diff = nav.height() || 0; } var tp = $("#results-top").offset().top; $('html,body').animate({ scrollTop: tp - diff }, 1000); } }, 100); }
    , ScrollToElement: function (el) { var j = $(el); if (j.size() && j.offset()) { var nav = $('nav'); var diff = 0; if (nav.size() && nav.css('position') == 'fixed') { diff = nav.height() || 0; } var tp = j.offset().top; $('html,body').animate({ scrollTop: tp - diff }, 500); } }
    , GetAssetsBaseFolder: function () { return _dlLocaleHelper.GetAssetsBaseFolder(); }
    , GetImagesBaseFolder: function () { return this.GetAssetsBaseFolder() + 'images/'; }
    , GetItemById: function (id) { return this.viewData ? this.viewData.searchData.itemMap[id] : null; }
    , GetPagerSize: function() { return _dlLocaleHelper.GetPagerPageSize() || 10; }
    , FindIdx: function (arr, func) { for (var i = 0; i < arr.length; i++) { if (func(arr[i])) return i; } return -1; }

    // misc data
    , annotationData: [{ ann: "8000", pri: 1, img: 'icon-8000.png', alt: 'More than 8000 patients treated with Invisalign' }, { ann: "4000", pri: 1, img: 'icon-4000.png', alt: 'More than 4000 patients treated with Invisalign' }, { ann: "2500", pri: 2, img: 'icon-2500.png', alt: 'More than 2500 patients treated with Invisalign' }, { ann: "2000", pri: 1, img: 'icon-2000.png', alt: 'More than 2000 patients treated with Invisalign' }, { ann: "1500", pri: 2, img: 'icon-1500.png', alt: 'More than 1500 patients treated with Invisalign' }, { ann: "1000", pri: 2, img: 'icon-1000.png', alt: 'More than 1000 patients treated with Invisalign' }, { ann: "500", pri: 3, img: 'icon-500.png', alt: 'More than 500 patients treated with Invisalign' }, { ann: "D", pri: 4, img: 'icon-d.png', alt: 'Diamond' }, { ann: "PE", pri: 4, img: 'icon-pe.png', alt: 'Platinum Elite' }, { ann: "P", pri: 5, img: 'icon-p.png', alt: 'Platinum' }, { ann: "G", pri: 6, img: 'icon-g.png', alt: 'Gold' }, { ann: "S", pri: 7, img: 'icon-s.png', alt: 'Silver' }, { ann: "TE", pri: 8, img: 'icon-t.png', alt: 'Teen' }, { ann: "CS", pri: 9, img: 'icon-cs.png', alt: 'Clinical Speaker' }, { ann: "ITERO", pri: 10, img: 'icon-ios.png', alt: 'This provider offers iTero® intraoral scanning facilities' }, { ann: "LARGE", pri: 11, img: 'icon-l.png', alt: 'Group account' }, { ann: "VIVERA", pri: 12, img: 'icon-vivera.png', alt: 'Vivera' }]

    // diacritics
    , removeDiacritics: function (str) {
        if (!str) return str;
        var diacriticsMap = {
            A: /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g,
            AA: /[\uA732]/g,
            AE: /[\u00C6\u01FC\u01E2]/g,
            AO: /[\uA734]/g,
            AU: /[\uA736]/g,
            AV: /[\uA738\uA73A]/g,
            AY: /[\uA73C]/g,
            B: /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g,
            C: /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g,
            D: /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g,
            DZ: /[\u01F1\u01C4]/g,
            Dz: /[\u01F2\u01C5]/g,
            E: /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g,
            F: /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g,
            G: /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g,
            H: /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g,
            I: /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g,
            J: /[\u004A\u24BF\uFF2A\u0134\u0248]/g,
            K: /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g,
            L: /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g,
            LJ: /[\u01C7]/g,
            Lj: /[\u01C8]/g,
            M: /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g,
            N: /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g,
            NJ: /[\u01CA]/g,
            Nj: /[\u01CB]/g,
            O: /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g,
            OI: /[\u01A2]/g,
            OO: /[\uA74E]/g,
            OU: /[\u0222]/g,
            P: /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g,
            Q: /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g,
            R: /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g,
            S: /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g,
            T: /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g,
            TZ: /[\uA728]/g,
            U: /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g,
            V: /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g,
            VY: /[\uA760]/g,
            W: /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g,
            X: /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g,
            Y: /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g,
            Z: /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g,
            a: /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g,
            aa: /[\uA733]/g,
            ae: /[\u00E6\u01FD\u01E3]/g,
            ao: /[\uA735]/g,
            au: /[\uA737]/g,
            av: /[\uA739\uA73B]/g,
            ay: /[\uA73D]/g,
            b: /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g,
            c: /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g,
            d: /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g,
            dz: /[\u01F3\u01C6]/g,
            e: /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g,
            f: /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g,
            g: /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g,
            h: /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g,
            hv: /[\u0195]/g,
            i: /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g,
            j: /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g,
            k: /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g,
            l: /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g,
            lj: /[\u01C9]/g,
            m: /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g,
            n: /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g,
            nj: /[\u01CC]/g,
            o: /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g,
            oi: /[\u01A3]/g,
            ou: /[\u0223]/g,
            oo: /[\uA74F]/g,
            p: /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g,
            q: /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g,
            r: /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g,
            s: /[\u0073\u24E2\uFF53\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g,
            ss: /[\u00DF]/g,
            t: /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g,
            tz: /[\uA729]/g,
            u: /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g,
            v: /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g,
            vy: /[\uA761]/g,
            w: /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g,
            x: /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g,
            y: /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g,
            z: /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g
        };
        for (var x in diacriticsMap) {
            // Iterate through each keys in the above object and perform a replace
            str = str.replace(diacriticsMap[x], x);
        }
        return str;
    }
};
var _DalayOnce = function (f, delay) { this.f = f; this.delay = delay; }; _DalayOnce.prototype = { Cancel: function () { if (this.tmrId) { window.clearTimeout(this.tmrId); } }, Exec: function () { this.Cancel(); var p = this; this.tmrId = window.setTimeout(function () { p.tmrId = null; p.f(); }, this.delay); } };
if (!window.console) window.console = { log: function () { } };

$(function () { _dlHelper.Start(); });