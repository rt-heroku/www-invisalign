var _googleTagsHelper = {

    _conversionOnce: false
    , _tags: []
    , _scriptIFrameArr: []

    , Init: function () {
        var p = this;
        if (window['_dlTrackingHelper'] && window['_dlTrackingHelper'].SetTrackingCallback) {
            window['_dlTrackingHelper'].SetTrackingCallback(function (a, b, c, d) { p.HandleEvent(c); });
        }
    }

    , HandleEvent: function (eventType) {
        if (eventType == "VIEW_CONTACT_INFO" && !this._conversionOnce) {
            this._conversionOnce = true;
            this.ExecuteTagsForGroup('2');
        }
    }

    , ExecuteTagsForGroup: function (groupName) {

        this._scriptIFrameArr = [];
        for (var i = 0; i < this._tags.length; i++) {
            var tagsG = this._tags[i];
            for (var j = 0; j < tagsG.length; j++) {
                var t = tagsG[j];
                if (t.Group == groupName && t.gt_handler) {
                    if (this[t.gt_handler]) this[t.gt_handler](t);
                    else if (window[t.gt_handler]) window[t.gt_handler](t);
                }
            }
        }

        if (this._scriptIFrameArr.length && !this.IsAndroid()) {
            try {
                this.ExecuteScriptsInIframe(this._scriptIFrameArr);
            }
            catch (ex) { }
        }
    }

    , ExecGT: function (data) {
        var rand = Math.random() + '';
        var rand = rand * 10000000000000;
        var img = $('<img />', { src: 'https://www.googleadservices.com/pagead/conversion/' + data.Id + '/?random=' + rand + '&value=' + data.Value + '&label=' + data.Label + '&guid=ON&script=0', style: 'position:absolute;left:-1000px;top:-1000px;' })
    }

    , ExecScriptIFrame: function (data) {
        var item = { script: data.PixelUrl };
        this._scriptIFrameArr.push(item);
    }

    , ExecIFrameRand: function (data) {

        var axel = Math.random() + "";
        var a = axel * 10000000000000;
        var s = '<iframe src="' + data.Url + a + '" width="1" height="1" frameborder="0" style="position:absolute;left:-1000px;top:-1000px;"></iframe>';

        $('body').append(s);
    }

    , ExecuteScriptsInIframe: function (arr) {
        var html = '<!DOCTYPE html>'
        + '<html><head><title>Dynamic iframe</title></head>'
        + '<body>';

        for (var i = 0; i < arr.length; i++) {
            html += '<script type="text/javascript" src="' + arr[i].script + '"><\/script>';
        }
        html += '</body></html>';

        var iframe = $('<iframe />', { src: 'about:blank', width: '1', height: '1', style: 'position:absolute;left:-1000px;top:-1000px;' });
        $('body').append(iframe);

        iframe = iframe.get(0);
        var doc = iframe.contentWindow.document;

        doc.open('text/html', 'replace');
        doc.write(html);
        doc.close();
    }

    , IsAndroid: function () {
        var ua = navigator.userAgent.toLowerCase();
        return ua.indexOf("android") > -1;
    }
};

var _gth = _googleTagsHelper;
$(function () { _googleTagsHelper.Init(); });