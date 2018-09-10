_dlLocaleHelper = {
    defaultCountryData: {
            label: "United Kingdom"
            , searchName: "UK"
            , code: "GB"
            , countryList: "gb"
            , locales: ["en-gb", "en"]
            , distUnit: "mi"
            , zipRegex: "^[A-Z]{1,2}[0-9R][0-9A-Z]?[ ]?[0-9][ABD-HJLNP-UW-Z]{2}$"
            , sampleZip: "CB2 9NH"
            , addressPattern: "{SA}, {CT} {PC}, {CY}"
            , countryRestriction: "^(gb|uk)$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

    , defaultConfiguration: {
            country: "en"
            , language: "en"
            , pagerPageSize: 10
            , pagerPagesInNavigation: 5
            , defaultMapZoom: 12
            , showCountryPicker: false
            , assetsBaseFolder: "/_layouts/AlignTech.Invisalign/"
            , langPathSubfolder: ""
            , contactFormUrl: "/_layouts/AlignTech.Invisalign/ContactForm/ContactForm.html?did={did}&name={name}&country={country}&language={language}&it=eu"
            , countryList: ["gb"]
            , defaultCountry: "gb"
        }

    , countryDataMixin: {
            GetSearchCountry: function () { return this.searchName; }
            , GetCountryList: function () { return this.countryList; }
            , GetCountryCode: function () { return this.code; }
            , GetCountryLabel: function () { var lbl = _dlMiscHelper.Res('countryLabel_' + this.GetCountryCodeLower()); return lbl == '' ? this.label : lbl; }
            , GetCountryCodeLower: function () { return (this.code || '').toLowerCase(); }
            , GetCountryLocale: function () { return this.locales; }
            , GetDistanceUnit: function () { return this.distUnit; }
            , GetDistanceLabel: function () { var lbl = _dlMiscHelper.Res('labelDist_' + this.distUnit); return lbl == '' ? this.distUnit : lbl; }
            , GetZipRegex: function () { return this.zipRegex ? new RegExp (this.zipRegex, "i") : null; }
            , GetZipError: function () { return  _dlMiscHelper.Res('labelZipError').replace('{sampleZip}', this.sampleZip); }
            , GetAddressPattern: function () { return this.addressPattern; }
            , GetCountryRestrictionRe: function () { return this.countryRestriction ? new RegExp(this.countryRestriction, 'gi') : null; }
            , GetDefaultPCRadius: function() { return this.defaultPCRadius; }
            , GetDefaultCityRadius: function() { return this.defaultCityRadius; }
            , GetDefaultPCRadiusIncrement: function() { return this.defaultPCRadiusIncrement; }
            , GetDefaultCityRadiusIncrement: function() { return this.defaultCityRadiusIncrement; }
            , GetDisablePostalCode: function() { return this.disablePostalCode ? true : false; }
            , GetManualPostalCodes: function() { return this.manualPostalCodes || {}; }
            , GetManualPCRadius: function () { return this.manualPCRadius || {}; }
    }

    , currentCountryData: null

    // public
    , InitLocaleHelper: function() {
    }
    
    , GetHideLargeAccountLegend: function() { var n = this.GetConfiguration().hideLargeAccountLegend; return n ? true : false; }
    , GetPagerPageSize: function() { return this.GetConfiguration().pagerPageSize || 10; }
    , GetPagerPagesInNavigation: function() { return this.GetConfiguration().pagerPagesInNavigation || 5; }
    , GetDefaultMapZoom: function() { return this.GetConfiguration().defaultMapZoom || 12; }
    , GetShowCountryPicker: function() { var n = this.GetConfiguration().showCountryPicker; return n ? true : false; }
    , GetAssetsBaseFolder: function() { return this.GetConfiguration().assetsBaseFolder || "/_layouts/AlignTech.Invisalign/"; }
    , GetLangPathSubfolder: function () { return this.GetConfiguration().langPathSubfolder || ""; }
    , GetCombinedCityPostalCode: function () { return this.GetConfiguration().combinedCityPostalCode || false; }
    , GetContactFormUrl: function() {
        var configuration = this.GetConfiguration();
        var url = configuration.contactFormUrl || "/_layouts/AlignTech.Invisalign/ContactForm/ContactForm.html?did={did}&name={name}&country={country}&language={language}&it=eu"; 
        return url.replace('{country}', configuration.country || 'en').replace('{language}', configuration.language || 'en');
    }
    , GetIPDFormUrl: function () {
        var configuration = this.GetConfiguration();
        var url = configuration.ipdFormUrl || "/_layouts/AlignTech.Invisalign/ContactForm/IPDForm.html?did={did}&name={name}&country={country}&language={language}&it=eu";
        return url.replace('{country}', configuration.country || 'en').replace('{language}', configuration.language || 'en');
    }

    , GetHideDistanceSelectorInForm: function () { var n = this.GetConfiguration().hideDistanceSelectorInForm; return n ? true : false; }
    , GetHideDistanceSelectorInMap: function () { var n = this.GetConfiguration().hideDistanceSelectorInMap; return n ? true : false; }
    , GetHideAnnotations: function () { var n = this.GetConfiguration().hideAnnotations; return n ? true : false; }
    , GetDistanceForDefaultSort: function () { var n = this.GetConfiguration().distanceForDefaultSort; return n ? true : false; }
    , GetShowContactForm: function () { var n = this.GetConfiguration().showContactForm; return n ? true : false; }
    , GetShowProviderBio: function () { var n = this.GetConfiguration().showProviderBio; return n ? true : false; }
    , GetProviderBioLocale: function () { return this.GetConfiguration().providerBioLocale || 'gb'; }
    , GetProviderBioUrl: function (did, name, cid) { 
    
        if (!_dlMiscHelper.IsNumber(did) || !name || !name.length) return '';
        name = name.replace(/[,]/g, '_');
        name = name.replace(/[^\w_]/g, '');
        
        var configuration = this.GetConfiguration(); 
        var url = this.GetConfiguration().providerBioUrl || ''; 
        return url.replace('{language}', encodeURIComponent(this.GetProviderBioLocale())).replace('{did}', encodeURIComponent(did)).replace('{name}', encodeURIComponent(name)).replace('{cid}', encodeURIComponent(cid)); 
    }
    , GetHidePostalCode: function() { var n = this.GetConfiguration().hidePostalCode; return n ? true : false; }

    , GetCurrentCountryData: function () { 
        if (this.currentCountryData) return this.currentCountryData;
        
        this.InitInternal();
        this.currentCountryData = this.GetDefaultCountryDataFromList();
        if (!this.currentCountryData) { this.currentCountryData = this.defaultCountryData; } 
        return this.currentCountryData; 
    }
    
    , GetSearchCountry: function () { return this.GetCurrentCountryData().GetSearchCountry(); }
    , GetCountryList: function () { return this.GetCurrentCountryData().GetCountryList(); }
    , GetCountryCode: function () { return this.GetCurrentCountryData().GetCountryCode(); }
    , GetCountryCodeLower: function () { return this.GetCurrentCountryData().GetCountryCodeLower(); }
    , GetCountryLocale: function () { return this.GetCurrentCountryData().GetCountryLocale(); }
    , GetDistanceUnit: function () { return this.GetCurrentCountryData().GetDistanceUnit(); }
    , GetDistanceLabel: function () { return this.GetCurrentCountryData().GetDistanceLabel(); }
    , GetZipRegex: function () { return this.GetCurrentCountryData().GetZipRegex(); }
    , GetZipError: function () { return this.GetCurrentCountryData().GetZipError(); }
    , GetAddressPattern: function () { return this.GetCurrentCountryData().GetAddressPattern(); }
    , GetCountryRestrictionRe: function () { return this.GetCurrentCountryData().GetCountryRestrictionRe(); }
    
    , GetDefaultCountryCode: function () { this.InitInternal(); return this.defaultCountryCode; }
    
    , SetCurrentCountryData: function (countryData) { if (!countryData) return; this.currentCountryData = countryData; }
    
    , SetCurrentCountryDataByCode: function (countryCode) {
        var cd = this.GetCountryDataByCode(countryCode);
        if (cd) this.SetCurrentCountryData(cd);
    }
    
    , SetCurrentCountryDataByAcceptLanguage: function (acceptLanguage) {
        if (!acceptLanguage || !acceptLanguage.length) return;

        var countryData = null, fullMatch = null, partialMatch = null, countryDatas = this.GetCountryDataList();
        for (var i in acceptLanguage) {
            var al = acceptLanguage[i];

            for (var j in countryDatas) {
                var cd = countryDatas[j];
                if (!cd.localeRE) continue;

                if (al.match(cd.localeRE)) {
                    fullMatch = cd; break;
                }

                if (partialMatch) continue;
                var partAl = al.split('-')[0];
                if (al != partAl && partAl.match(cd.localeRE)) {
                    partialMatch = cd;
                }
            }
            if (fullMatch || partialMatch) break;
        }
        if (fullMatch) countryData = fullMatch;
        else if (partialMatch) countryData = partialMatch;
        
        if (countryData) this.SetCurrentCountryData(countryData);
    }

    , GetCountryDataByCode: function (countryCode) {
        countryCode = countryCode.toLowerCase();
        return _dlMiscHelper.FindInArray(this.GetCountryDataList(), function(idx, it) { return it.code.toLowerCase() == countryCode; } );
    }
    
    , GetCodeLabelList: function() {
        return $.map(this.GetCountryDataList(), function(it) { return { code: it.GetCountryCode(), label: it.GetCountryLabel() }; });
    }
    
    // private
    , GetConfiguration: function() { this.InitInternal(); return this.configuration; }
    
    , InitInternal: function () {
        if (this._dlCountryData) return;
    
        if (window['_dlCountryData']) this._dlCountryData = window['_dlCountryData'];
        else {
            this._dlCountryData = {
                "countries": {
                    "gb": this.defaultCountryData
                }
                , "configurations": {
                    "gb_en": this.defaultConfiguration
                }
                , defaultConfiguration: "gb_en"
            };
        }
        
        var configurations = this._dlCountryData.configurations, countries = this._dlCountryData.countries, defaultConfiguration = this._dlCountryData.defaultConfiguration;
          
        var configuration = configurations[defaultConfiguration];  
        if (defaultConfiguration != 'default' && configurations['default']) configuration = $.extend({}, configurations['default'], configuration);
        
        var countryList = [], defaultCountry = null;
        for (var i = 0; i < configuration.countryList.length; i++){
            var code = configuration.countryList[i];
            if (countries[code]) countryList.push(countries[code]);
        }
        
        if (countryList.length == 0) countryList.push(this.defaultCountryData);
        for (var i = 0; i < countryList.length; i++){
            var countryData = countryList[i];
            $.extend(countryData, this.countryDataMixin);
            if (configuration.defaultCountry && countryData.GetCountryCodeLower() == configuration.defaultCountry) defaultCountry = countryData;
        }
        this.InitCountryDatasLocaleRE(countryList);
        if (defaultCountry == null) defaultCountry = countryList[0];
        
        this.defaultCountryData = defaultCountry;
        this.defaultCountryCode = defaultCountry.GetCountryCode();
        this.countryList = countryList;
        this.configuration = configuration;
    }
    
    , GetDefaultCountryDataFromList: function(){
        this.InitInternal();
        return this.defaultCountryData;
    }
    
    , GetCountryDataList: function(){
        this.InitInternal();
        return this.countryList;
    }

    , InitCountryDatasLocaleRE: function (countryDatas) {
        if (!countryDatas || !countryDatas.length) return;
        if (countryDatas[0] && countryDatas[0].localeRE) return;

        for (var i in countryDatas) {
            var cd = countryDatas[i];
            if (!cd.locales || !cd.locales.length) {
                cd.localeRE = null;
            }
            else {
                cd.localeRE = new RegExp('^(' + cd.locales.join('|') + ')$', 'gi');
            }
        }
    }
    
};