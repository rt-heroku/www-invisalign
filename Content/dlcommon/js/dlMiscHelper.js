_dlMiscHelper = {
    // public
    GenerateGuid: function () {
        return this.GenerateRandom('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx');
    }

    // public
    , GenerateShortGuid: function () {
        return this.GenerateRandom('xxxxxxxxxxxx');
    }

    // public
    , GenerateRandom: function (pattern) {
        return pattern.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // public
    , CloneObj: function (obj) {
        var cloneObj = {};
        for (var n in obj) { cloneObj[n] = obj[n]; }
        return cloneObj;
    }
    
    // public
    , SetCookie: function (c_name, value, exdays) {
        var canSetCookie = true;
        if (window['invisalignEnableCookieDirective'] && window['_cookieDirective']) { canSetCookie = window['_cookieDirective'].checkUseScript(2); }

        if (!canSetCookie) return;

        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString() + "; path=/");
        document.cookie = c_name + "=" + c_value;
    }

    // public
    , GetCookie: function (c_name) {
        var i, x, y, ARRcookies = document.cookie.split(";");
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == c_name) {
                return unescape(y);
            }
        }
        return null;
    }
    
    // public
    , FindInArray: function (arr, func) {
        if (!arr || !arr.length) return null;
        for (var i = 0; i < arr.length; i++) {
            if (func(i, arr[i])) return arr[i];
        }
        return null;
    }

    // public
    , IsNumber: function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    // public
    , GetNumber: function (s, def) {
        if (!this.IsNumber(s)) return def;
        return parseFloat(s);
    }

    // public
    , LTrim: function (s, ch){
        return this.InternalTrim(s, ch, '^' + this.EscapeForRe(ch) + '+');
    }
    
    // public
    , RTrim: function (s, ch){
        return this.InternalTrim(s, ch, this.EscapeForRe(ch) + '+$');
    }
    
    // public
    , GetCachedRegExp: function(re, opts) {
        var key = re + '**' + (opts || '');
        if (!this._cachedRE) this._cachedRE = {};
        if (!this._cachedRE[key]) {
            this._cachedRE[key] = new RegExp(re, opts);
        }
        return this._cachedRE[key];
    }
    
    // public
    // template should be like <a href='{link}'>{label}</a>, dataSource = { link: '...', label: '...' }
    , ApplyTemplate: function (template, dataSource) {
        var s = template;
        for (var n in dataSource) {
            var ptt = '{' + n + '}';
            var re = this.GetCachedRegExp(ptt, 'g');

            s = s.replace(re, '' + dataSource[n]);
        }
        return s;
    }
    
    // public
    , GetUrlParameters: function (q) {

        var res = {};
        q = q || window.location.search;
        if (!q || q == '') return res;
        q = q.replace(this.GetCachedRegExp("^.*\\?"), '');
        
        var arr = q.split('&');
        for (var i = 0; i < arr.length; i++) {
            var kv = arr[i];
            var pos = kv.indexOf('=');
            if (pos < 0) { res[kv] = ''; }
            else { res[kv.substring(0, pos)] = decodeURIComponent(kv.substr(pos + 1)); }
        }

        return res;
    }

    // public
    , GetGlobalScriptRef: function (obj) {
        if (!obj) return;
        if (!obj.__hidden_id) {
            if (!this._globalID) this._globalID = 1;
            obj.__hidden_id = this._globalID++;
            window['_globalObj' + obj.__hidden_id] = obj;
        }
        
        return "window['_globalObj" + obj.__hidden_id + "']";
    }
    
    // public
    , CalculateDistance: function (lat1, lng1, lat2, lng2) {
        var temp = Math.sin(lat1 / 57.2957795130823) * Math.sin(lat2 / 57.2957795130823) + Math.cos(lat1 / 57.2957795130823) * Math.cos(lat2 / 57.2957795130823) * Math.cos(lng2 / 57.2957795130823 - lng1 / 57.2957795130823)

        if (temp > 1) temp = 1;
        else if (temp < -1) temp = -1;

        return (6371 * Math.acos(temp));
    }

    // public
    , InitResObj: function(obj){
        this._resObj = obj;
    }
    
    // public
    , Res: function (id) {
        return this.ResDef(id, '');
    }

    // public
    , ResDef: function (id, def) {
        return (this._resObj && this._resObj[id]) ? this._resObj[id] : def;
    }

    // public
    , ResObj: function (id) {
        return this.ResDef(id, null);
    }
    
    // public
    , EscapeForRe: function(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
  
    // public
    , IsBackwardBrowser: function () {
        return document.compatMode == "BackCompat" || window['_isIE6'];
    }
    
    // public
    , IsLegacyIE: function () {
        return window['_ie_legacy'] ? true : false;
    }
    
    // private
    , InternalTrim: function (s, ch, restr){
        if (!s || s == '') return s;
        if (!ch) ch = ' ';
        var re = this.GetCachedRegExp(restr);
        return s.replace(re, '');
    }
};