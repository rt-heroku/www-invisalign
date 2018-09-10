/*
fieldData = [
    { elementId: 'txtFirstName'
    , defaultValue: ''
    , errorClass: null
    , reset: function(sender, field) {}
    , type: 'edit' // checkbox|radio|select
    , rules:
    [
        { type: 'required', labelId: 'labelId', error: 'error' }
        , { type: 'regexp', pattern: /^\w+$/gi, labelId: 'labelId', error: 'error' }
        , { type: 'server', code: '410', labelId: 'labelId', error: 'error' }
        , { type: 'custom', validate: function(sender, { field: field, value: val, checkCodes: checkCodes }) { return false; }, labelId: 'labelId', error: 'error' }
    ]
    }
];
*/

(function ($) {

    var FormData = function (target, options) { this.target = target; this.options = {}; $.extend(this.options, this.opts); if (options) $.extend(this.options, options); }
    FormData.prototype =
    {
        target: null
        , opts: {
            fieldData: []
            , validateAllFields: true
            , oneErrorPerField: true
            , showErrorsOnChange: true
            , submitId: null
            , resetId: null
            , loadAnimationId: null
            , submitUrl: null
            , returnUrl: null
            , preSubmit: null
            , preValidate: null
            , postSubmit: null
            , postValidate: null
            , postFieldValidate: null
            , validationError: null
            , codeParamName: 'code'
            , submitType: 'form'
        }
        , options: null
        , submitting: false

        , Init: function () {
            this.InitHandlers();
        }

        , InitHandlers: function () {
            var p = this;
            this.target.submit(function () {
                p.SubmitHandler();
                // handle it ourselves
                return false;
            });

            if (this.options.submitId) { $('#' + this.options.submitId).click(function () { p.SubmitHandler(); }); }
            if (this.options.resetId) $('#' + this.options.resetId).click(function () { p.ResetFields(); });

            if (this.options.showErrorsOnChange) {
                this.Each(this.options.fieldData, function (idx, field) {
                    var el = p.GetFieldElement(field);
                    if (el) el.change(function () {
                        p.ValidateField(field);
                        p.ShowErrorLabelsForField(field);
                    });
                });
            }
        }

        , SubmitHandler: function () {

            if (this.submitting) return;
            var p = this;

            if (this.options.preValidate && this.options.preValidate(p, {}) === false) return;
            this.ValidateFields();

            var isValid = this.IsValid();
            if (this.options.postValidate && this.options.postValidate(p, { isValid: isValid }) === false) return;

            if (!isValid) {
                this.ShowErrorLabels();
            }
            else {
                if (this.options.preSubmit && this.options.preSubmit(p, {}) === false) return;

                this.ShowFormLoading(true);
                this.submitting = true;

                if (this.options.returnUrl){
                    var ruQ = $('#return_url');
                    if (ruQ.size() == 0){
                        ruQ = $('<input />', { type: 'hidden', id: 'return_url', name: 'return_url'});
                        $(this.target).append(ruQ);
                    }
                    ruQ.val(this.options.returnUrl);
                }

                if (this.options.submitType == 'form') {
                    var target = p.target;
                    if (target.size() == 0 || target.get(0).tagName.toLowerCase() != 'form'){
                        
                        if (document.forms && document.forms.length && !this.options.createform) {
                            target = $(document.forms[0]);
                        }
                        else {
                            target = $('<form />', {method: 'post', id:'dummyForm'});
                            $('body').append(target);

                            this.tempForm = target;
                            var fEl = target.get(0);
                            var data = this.GetFieldValuesAsObj();
                            for (var n in data){
                                target.append($('<input />', { type: 'hidden', name: n, value: data[n] }));
                            }
                            if (this.options.returnUrl) target.append($('<input />', { type: 'hidden', name: 'return_url', value: this.options.returnUrl }));
                        }
                    }

                    var options = {
                        success: function (a, b, c, d, e) { p.HandleFormCallback(a, b, e); } // post-submit callback 
                        , error: function () { p.HandleFormCallback('', ''); }
                        , type: 'POST'
                        , iframe: true
                        , skipEncodingOverride: false
                    };
                    if (this.options.submitUrl) options.url = this.options.submitUrl;

                    window.setTimeout(function () { target.ajaxSubmit(options); }, 200);
                }
                else if (this.options.submitType == 'jsonp') {
                    $.ajax(
                    {
                        url: this.options.submitUrl
                        , data: this.GetFieldValuesAsObj()
                        , type: 'GET'
                        , crossDomain: true
                        , processData: true
                        , dataType: "jsonp"
                        , jsonp: "method"
                        , success: function (responseData) { p.HandleJsonpCallback(responseData); }
                    });
                }
            }
        }

        , HandleJsonpCallback: function (responseData) {
            var code = null;
            if (responseData) {
                var temp = responseData[this.options.codeParamName || 'code'];
                if (temp) { code = '' + temp; }
            }
            this.HandleFormSubmit('success', code, responseData);
        }

        , HandleFormCallback: function (responseText, statusText, frameObj) {

            var code = null;
            var parms = null;
            if (this.tempForm){
                try{
                    this.tempForm.remove();
                    this.tempForm = null;
                }
                catch(ex){}
            }

            if (statusText == 'success') {
                try {
                    var w = frameObj.contentWindow || frameObj.contentDocument;
                    var query = w.location.search;
                    parms = this.GetUrlParameters(query);

                    var temp = parms[this.options.codeParamName || 'code'];
                    if (temp) code = temp;
                }
                catch (ex) { }
            }
            else code = '500';
            this.HandleFormSubmit(statusText, code, parms);
        }

        , HandleFormSubmit: function (statusText, code, parms) {
            this.ShowFormLoading(false);
            this.submitting = false;

            var isValid = true;
            if (!code || code == '200') { }
            else {
                this.ValidateFields(code.split(','));
                isValid = this.IsValid();
                this.ShowErrorLabels();
            }
            if (this.options.postSubmit) this.options.postSubmit(this, { status: statusText, isValid: isValid, code: code, parms: parms });
        }

        , ShowFormLoading: function (show) {
            if (!this.options.loadAnimationId) return;

            if (show) $('#' + this.options.loadAnimationId).show();
            else $('#' + this.options.loadAnimationId).hide();
        }

        , IsValid: function () {
            return this.Find(this.options.fieldData, function (idx, it) { return !it.isValid; }) == null;
        }

        , GetFieldValuesAsObj: function () {
            var p = this, unk;
            var obj = {};
            this.Each(this.options.fieldData, function (idx, it) {
                var n = p.GetFieldElementName(it);
                if (n) { var v = p.GetFieldValue(it); if (v !== unk) obj[n] = v; }
            });
            return obj;
        }

        , ValidateFields: function (checkCodes) {
            var p = this;
            this.Each(this.options.fieldData, function (idx, it) { p.ValidateField(it, checkCodes); });
        }

        , ValidateField: function (field, checkCodes) {

            field.isValid = true;
            var val = this.GetFieldValue(field);

            this.Each(field.rules, function (idx, it) {

                it.isValid = true;
                if (it.type == 'required') {
                    var def = field.defaultValue || '';
                    it.isValid = (val != def);
                    if (typeof val == 'undefined') it.isValid = false;
                }
                else if (it.type == 'regexp') {
                    if (it.pattern) {
                        it.isValid = it.pattern.test(val);
                    }
                }
                else if (it.type == 'server') {
                    if (checkCodes && checkCodes.length && it.code && $.inArray(it.code, checkCodes) > -1) {
                        it.isValid = false;
                    }
                }
                else if (it.type == 'custom') {
                    if (it.validate) it.isValid = it.validate(this, { field: field, value: val, checkCodes: checkCodes });
                }
                if (!it.isValid) field.isValid = false;
            });

            if (this.options.postFieldValidate) { this.options.postFieldValidate(this, { field: field }); }
            if (!field.isValid && this.options.validationError) this.options.validationError(this, { field: field });
            return field.isValid;
        }

        , ShowErrorLabels: function () {
            var p = this;
            this.Each(this.options.fieldData, function (idx, field) {
                return p.ShowErrorLabelsForField(field);
            });
        }

        , ShowErrorLabelsForField: function (field) {
            var p = this;
            this.HideErrorLabelsForField(field);
            if (!field.isValid) {
                p.Each(field.rules, function (idx, rule) {
                    if (rule.labelId && !rule.isValid) {
                        p.ShowLabel($('#' + rule.labelId));

                        if (p.options.oneErrorPerField) return false;
                    }
                });

                if (!p.options.validateAllFields) return false;
            }
        }

        , ShowLabel: function (lbl) {
            if (this.options.showLabel) this.options.showLabel(lbl);
            else lbl.show();
        }

        , HideLabel: function (lbl) {
            if (this.options.hideLabel) this.options.hideLabel(lbl);
            else lbl.hide();
        }

        , GetErrors: function () {
            var p = this;
            var fieldData = $.grep(this.options.fieldData, function (field) { return !field.isValid; });
            return $.map(fieldData, function (field) {
                return {
                    field: field
                    , errors: $.map($.grep((field.rules || []), function (rule) { return !rule.isValid; }), function (r) { return p.GetRuleError(r); })
                };
            });
        }

        , GetRuleError: function (rule) {
            var err = '';
            if (rule.labelId) {
                var jq = $('#' + rule.labelId);
                if (jq.size() > 0) err = jq.html();
            }
            if (!err || err == '') err = rule.error || '';
            return err;
        }

        , GetFieldElement: function (field) {
            var jq = $('#' + field.elementId);
            return jq.size() == 0 ? null : jq;
        }

        , GetFieldElementName: function (field) {
            var fe = this.GetFieldElement(field);
            return fe ? fe.attr('name') : null;
        }

        , GetFieldValue: function (field) {
            var el = this.GetFieldElement(field);
            var val = null;
            var unk;

            if (el) {
                if (field.type == 'radio') {
                    el.each(function () {
                        if ($(this).attr('checked')) val = $(this).val();
                    });
                }
                else if (field.type == 'checkbox') {
                    val = el.prop('checked') ? el.val() : unk;
                }
                else {
                    val = el.val();
                }
            }
            return val;
        }

        , IsFieldValid: function (field) {
            return field.isValid;
        }

        , SetSubmitUrl: function (submitUrl) {
            this.options.submitUrl = submitUrl;
        }

        , ResetFields: function () {

            var fieldData = this.options.fieldData;

            for (var i = 0; i < fieldData.length; i++) {
                var field = fieldData[i];

                this.HideErrorLabelsForField(field);
                if (field.reset) { field.reset(this, field); }
                else {
                    var jq = $('#' + field.elementId);
                    if (jq.size() == 0) continue;

                    if (jq.attr('type') == 'checkbox') jq.removeAttr('checked');
                    else jq.val(field.defaultValue || '');
                }
            }
        }

        , HideErrorLabelsForField: function (field) {
            var p = this;
            this.Each(field.rules, function (idx, it) {
                if (it.labelId) p.HideLabel($('#' + it.labelId));
            });
        }

        , Each: function (arr, func) {
            if (!arr || !arr.length) return;
            for (var i = 0; i < arr.length; i++) {
                if (func(i, arr[i]) === false) break;
            }
        }

        , Find: function (arr, func) {
            if (!arr || !arr.length) return null;
            for (var i = 0; i < arr.length; i++) {
                if (func(i, arr[i])) return arr[i];
            }
            return null;
        }

        , GetUrlParameters: function (query) {

            var res = {};
            var q = query || window.location.search;
            if (!q || q == '') return res;

            q = q.replace(/^\?/, '');
            var arr = q.split('&');
            for (var i = 0; i < arr.length; i++) {
                var kv = arr[i];
                var pos = kv.indexOf('=');
                if (pos < 0) { res[kv] = ''; }
                else { res[kv.substring(0, pos)] = unescape(kv.substr(pos + 1)); }
            }

            return res;
        }
    };

    var methods = {
        init: function (options) {
            return this.each(function () {
                var p = $(this), obj = p.data('formhelper');
                if (!obj) { obj = p.data('formhelper', new FormData(p, options)); obj = p.data('formhelper'); obj.Init(); }
            });
        }
        , getFormHelper: function () {
            var p = $(this), obj = p.data('formhelper');
            return obj;
        }
    };

    $.fn.formhelper = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.formhelper');
        }
    };

})(jQuery);