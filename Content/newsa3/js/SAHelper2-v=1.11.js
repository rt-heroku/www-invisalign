var _r = function (k) { return data.Lang[k] || ''; };
var _SAHelper = {
    _submitUrl: 'http://awsteu1.eu.aligntech.com:8086/IK/Create'
    , _stepStack: []
    , _bkgImages: []
    , _defaultValidationError: _r('label_proceed')
    , _postalCodeHelpMsg: _r('label_postalcode_hint')
    , _serverError: _r('error_server')
    , _fieldValues: {}
    , _render_data: null
    , _source_country: 'en'
    , _source_language: 'en'
    , _age_range: ''
    , _gender: ''
    , _emailParam: ''
    , _trackedPage: {}
    , _trackedQuestion: {}
    , _stats: { patientType: 'A', resultImage: 'images/Results/SpacingCrowdingImages/U3L3.png' }
    , _fieldData: [
                { elementId: 'first_name', label: '', rules: [{ type: 'required', error: _r('error_required') }] }
                , { elementId: 'last_name', label: '', rules: [{ type: 'required', error: _r('error_required') }] }
                , { elementId: 'postal_code', label: '', rules: [{ type: 'required', error: _r('error_required') }] }
                , { elementId: 'email', label: '', rules: [{ type: 'required', error: _r('error_required') }, { type: 'regexp', pattern: /^\w+([-+.\']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, error: _r('error_required') }] }
                , { elementId: 'offers_accept', type: 'checkbox', label: '', rules: [] }
                , { elementId: 'request_type', label: '', rules: [] }
                , { elementId: 'are_you', label: '', rules: [] }
                , { elementId: 'sa_answers', label: '', rules: [] }
                , { elementId: 'sa_results', label: '', rules: [] }
                , { elementId: 'source_country', label: '', rules: [] }
                , { elementId: 'source_language', label: '', rules: [] }
                , { elementId: 'request_promo', label: '', rules: [] }
                , { elementId: 'age_range', label: '', rules: [] }
                , { elementId: 'gender', label: '', rules: [] }
                , { elementId: 'g-recaptcha-response', rules: [{ type: 'required', error: _r('error_required') }, { type: 'server', code: '500', error: _r('error_required') }] }
    ]
    , _loading: false
    , imgSliderWidth: null
    , imgSliderHeight: null

    , Init: function (opts) {
        var url = window.location.href;
        var m = /code=(\d+)/.exec(url);
        if (m && m.length) return;

        if (!opts) $.extend(this, opts);
        if (!this.data) { this.data = window['data']; }
        if (window['_bkgImages']) { this._bkgImages = window['_bkgImages']; }

        this.InitTemplates();
        this.InitEmailParam();

        var firstStep = this.data.steps[0];

        this._stepStack.push(firstStep);
        this.RenderStep(firstStep);
    }

    , InitTemplates: function () {
        templates = {};
        $.each(['StepTemplate', 'QuestionStepTemplate', 'CheckboxTemplate', 'RadioTemplate', 'AnswersTemplate', 'ImageTemplate', 'SliderTemplate', 'ProgressTemplate', 'ErrorPopup', 'DisclaimerTemplate', 'RadioImageTemplate', 'ResultsTemplate', 'ResultsTemplate2'], function (idx, it) { if ($('#' + it).size() == 0) { return; } templates[it] = { markup: $('#' + it).html(), allowCode: true }; });
        $.templates(templates);
    }

    , InitEmailParam: function () { try { var parms = _CommonHelper.GetUrlParameters(); if (parms.email) this._emailParam = parms.email; } catch (ex) { } }

    , RenderStep: function (step) {
        var p = this; var sliderData = null;
        this.GATrackPage(step);
        this.CheckContainerClass(step);
        this.ToggleBanners(step);

        var data = this._render_data = { step: step, helper: this, currentBkgImage: this.GetBkgImage(step) };
        if (step.type == 'end') { this.InvokeConversion(); }
        if (step.group == 'first') {
            data.subdatas = this.GetRenderSubDatas(step);
            var subd = this.Find(data.subdatas, function (it) { return it.step.type == 'sliders'; });
            if (subd) { sliderData = subd.step; this.PreRenderSliders(sliderData); }
        }

        var html = $.render['StepTemplate'](data);
        $('#step-container').html(html);

        if (step.group == 'first') {
            if (!this.IsMediumScreen()) { $('.sa-teeth-img').tooltip(); } $('#gender').val(this._gender || ''); $('#age_range').val(this._age_range || ''); $('#gender,#age_range').change(function () { p.CloseErrorPopup(); p.CheckGenderAgeHighlight([$(this)]); });
            if (sliderData) { this.PostRenderSliders(sliderData); }
            if (this._emailParam) { $('#email').val(this._emailParam); } $('#offers_accept').change(function () { if ($('#offers_accept').prop('checked')) { p.GTMTrack('email_opt_in', 'smile_assessment'); } });
            this.InitCaptchaAsync();
        }
        else if (step.type == 'end') { this.ScrollTo('#results-top'); }
    }

    , GetRenderSubDatas: function (currentStep) { var p = this; var steps = [currentStep]; for (var i = 0; i < 100; i++) { var nextStep = this.FindNextStep(currentStep); if (nextStep.type == 'end') { break; } steps.push(nextStep); currentStep = nextStep; } return $.map(steps, function (s) { return { step: s, helper: p }; }) }

    , CheckContainerClass: function (step) { if (step.type == 'end') { $('#step-container').removeClass('bminheight-full'); $('#step-container').css('background-image', 'none'); } else { $('#step-container').css('background-image', 'none'); if (!$('#step-container').hasClass('bminheight-full')) $('#step-container').addClass('bminheight-full'); } }
    , ToggleBanners: function (step) { if (step.type == 'end') { $('*[data-display=none]').show(); } else { $('*[data-display=none]').hide(); } }
    , InitCaptcha: function () { try { grecaptcha.render('captcha-container', { 'sitekey': $('#captcha-container').attr('data-sitekey') }); } catch (ex) { } }
    , InitCaptchaAsync: function () { if (window['grecaptcha']) { this.InitCaptcha(); } var tmr = null; var p = this; tmr = setInterval(function () { if (!window['grecaptcha']) { return; } window.clearTimeout(tmr); p.InitCaptcha(); }, 100); }

    , PreRenderSliders: function (step) { this.ForAll(step.questions[0].answers, function (a) { if (!a.result && a.result !== 0) a.result = 3; }); }
    , PostRenderSliders: function (step) {
        var p = this;
        $('.spacing-slider').on('input change', function () {
            var slider = $(this);
            var target = slider.attr('data-target');

            var sliderVal = Math.round(parseFloat(slider.val()));
            $('#' + target).attr('data-value', sliderVal);
            var idx = slider.attr('id') == 'spacing-slider-upper' ? 0 : 1;
            step.questions[0].answers[idx].result = sliderVal;
        });
    }

    , MoveNext: function () {
        if (this._loading) return;
        if (!this._stepStack.length) return;

        var currentStep = this._stepStack[this._stepStack.length - 1];
        if (currentStep.type == 'end') return;

        if (currentStep.group == 'first') {
            this._age_range = $('#age_range').val() || ''; this._gender = $('#gender').val() || '';
            if (!this.ValidateAllSteps()) return;
        }

        var nextStep = null;
        var idx = this.FindIdx(this.data.steps, function (s) { return s.type == 'end'; });
        if (idx >= 0 && idx < this.data.steps.length) nextStep = this.data.steps[idx];
        if (!nextStep) return;
        
        var p = this;
        var showNext = function() { p._stepStack.push(nextStep); p.RenderStep(nextStep); }

        if (currentStep.group == 'first') { this._stats = this.GetStats(); this.SubmitForm(showNext); }
        else { this.GATrackQuestion(currentStep); showNext(); }
    }

    , FindNextStep: function (currentStep) {
        var nextStep = null;
        var idx = this.FindIdx(this.data.steps, function (s) { return s.uid == currentStep.uid; });
        if (idx >= 0 && idx < this.data.steps.length - 1) { nextStep = this.data.steps[idx + 1]; }
        return nextStep;
    }

    , MovePrev: function () {
        if (this._loading) return;
        if (this._stepStack.length < 2) return;
        var prevStep = this._stepStack[this._stepStack.length - 2];
        this._stepStack.pop();
        this.RenderStep(prevStep);
    }

    , MoveStart: function () {
        if (this._loading) return;
        var startStep = 2;
        if (this._stepStack.length <= startStep + 1) return;
        var prevStep = this._stepStack[startStep];
        this._stepStack = this._stepStack.slice(0, startStep + 1);
        this.RenderStep(prevStep);
    }

    , CheckAddCaptchaField: function () {
        var c = $('#g-recaptcha-response');
        var tagName = '';
        if (c.size() > 0) { tagName = c.get(0).tagName.toLowerCase(); }
        if (c.size() == 0 || tagName == 'input') {
            var c = $('#step-container textarea[name="g-recaptcha-response"]');
            this.SetCreateInput('g-recaptcha-response', c.val() || '');
        }
    }

    , TrackAll: function () {
        var p = this;
        var data = this._render_data;
        var stepStack = $.map(data.subdatas, function (it) { return it.step; });

        this.ForAll(stepStack, function (step) {
            p.GATrackPage(step);
            p.GATrackQuestion(step);
        });
    }

    , SubmitForm: function (successCallback) {

        var a_r = this.FormatAnswersAndResults();
        this.CheckAddCaptchaField();
        this.SetCreateInput('request_type', 'NewSmileAssessment');
        this.SetCreateInput('sa_answers', a_r[0]);
        this.SetCreateInput('sa_results', a_r[1]);
        this.SetCreateInput('are_you', this._stats.patientType);
        this.SetCreateInput('source_country', this._source_country);
        this.SetCreateInput('source_language', this._source_language);
        
        try { var v = ''; if (window['promoTrackingPrefixes'] && window['promoTrackingPrefixes'].length) { v = window['promoTrackingPrefixes'].join(','); } this.SetCreateInput('request_promo', v); } catch (ex) { }

        if (this._age_range) this.SetCreateInput('age_range', this._age_range);
        if (this._gender) this.SetCreateInput('gender', this._gender);

        var p = this;
        this.ForAll(this._fieldData, function (f) { p._fieldValues[f.elementId] = $('#' + f.elementId).val(); });

        $('#step-container').formhelper({
            fieldData: p._fieldData
            , submitUrl: this._submitUrl
            , returnUrl: window.location.href
            , loadAnimationId: 'imgloading'
            , codeParamName: 'code'
            , submitType: 'form'
            , createform: true
            , preValidate: function (sender, data) { }
            , postValidate: function (sender, data) {
                if (!data.isValid) {
                    var items = sender.GetErrors();
                    if (items.length > 0) { p.ShowValidationError(items[0].errors[0]); }
                }
            }
            , postFieldValidate: function (sender, data) {
                var fieldData = data.field;
                var fieldElement = sender.GetFieldElement(data.field);
                if (!fieldElement) return;

                if (sender.IsFieldValid(data.field)) { if (data.field.elementId == 'g-recaptcha-response') { $('#captcha-container').removeClass('error'); } fieldElement.removeClass('error'); }
                else { if (data.field.elementId == 'g-recaptcha-response') { var c = $('#captcha-container'); if (!c.hasClass('error')) { c.addClass('error'); } } if (!fieldElement.hasClass('error')) { fieldElement.addClass('error'); } }
            }
            , preSubmit: function (sender, data) { p.CloseErrorPopup(); try { p.TrackAll(); } catch (ex) { } p._loading = true; return true; }
            , postSubmit: function (sender, data) {
				p._loading = false;
				if (data.code == '200') {
				    if (successCallback) successCallback();
				    p.CheckSetCompleteCookie(data);
                }
                else {
                    p.ShowValidationError(p._serverError);
                }
            }
        });
        var f = $('#step-container').formhelper('getFormHelper');
        f.SubmitHandler();
    }

    , CheckSetCompleteCookie: function (data) {
        try {
            if (data && data.parms && data.parms.hash) {
                this.CreateCookie('_saHash', data.parms.hash, 5 * 365);
            }
        }
        catch (ex) { }
    }

    , CreateCookie: function (name, value, days) {

        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    , FormatAnswersAndResults: function () {
        var answersDic = {};
        var resultsDic = { PatientType: this._stats.patientType, ResultImage: this._stats.resultImage, ResultCondition: this._stats.resultCondition, SecondaryCondition: this._stats.secondaryCondition };
        if (this._stats.sample_url) resultsDic.SampleUrl = this._stats.sample_url;
        if (this._stats.sample_image) resultsDic.SampleImage = this._stats.sample_image;
        
        var formatAnswersForStep = function(step, answers){
            var resArr = $.map(answers, function (a) { return step.type == 'sliders' ? a.result : a.uid; });
            return resArr.join('|');
        };

        var formatResultsForStep = function(step, answers){
            var resArr = $.map(answers, function (a) { return step.type == 'sliders' ? a.result : a.text; });
            return resArr.join('|');
        };

        var p = this;
        var data = this._render_data;
        var stepStack = $.map(data.subdatas, function (it) { return it.step; });

        this.ForAll(stepStack, function(step){
            if (step && step.questions && step.questions.length){
                var q = step.questions[0];
                var selectedAnswers = step.type == 'sliders' ? q.answers : p.Filter(q.answers, function(a) { return a.result; });
                if (selectedAnswers.length){
                    answersDic[step.group] = formatAnswersForStep(step, selectedAnswers);
                    resultsDic[step.group] = formatResultsForStep(step, selectedAnswers);
                }
            }
        });
        return [JSON.stringify(answersDic), JSON.stringify(resultsDic)];
    }

    , SelectAnswer: function (el, answerUid) {
        this.CloseErrorPopup();
        $('.radio .question').removeClass('question-error');

        el = $(el);
        var currentStep = this.GetStepByAnswerId(answerUid);
        if (!currentStep) return;

        $('#step' + currentStep.uid).removeClass('error');
        var answ = this.Find(currentStep.questions[0].answers, function (a) { return a.uid == answerUid; });

        if (currentStep.type == 'checks') { answ.result = answ.result ? null : true; }
        else { this.ForAll(currentStep.questions[0].answers, function (a) { a.result = null; }); answ.result = true; }

        var nextStep = this.FindNextStep(currentStep);
        if (currentStep.group != 'first' && currentStep.type != 'sliders') {
            if (nextStep) { var sc = $('#step' + nextStep.uid); if (sc.size()) { this.ScrollTo(sc); } }
        }
        this._stats = this.GetStats();
    }

    , GetStepByAnswerId: function (answerUid) {
        var p = this;
        var data = this._render_data; if (!data || !data.subdatas) return null;
        var subd = this.Find(data.subdatas, function (it) { var s = it.step; if (!s || !s.questions || !s.questions.length || !s.questions[0] || !s.questions[0].answers) return false; var q = s.questions[0]; var a = s.questions[0].answers; var t = p.Find(a, function (at) { return at.uid == answerUid; }); return t ? true : false; });
        return subd.step;
    }

    , ValidateAllSteps: function () {
        var data = this._render_data; if (!data || !data.subdatas) return;
        for (var i = 0; i < data.subdatas.length; i++) {
            var step = data.subdatas[i].step;
            if (!this.ValidateStep(step)) {
                var stepel = $('#step' + step.uid);
                stepel.addClass('error');
                this.ScrollTo(stepel);
                return false;
            }
        }
        return true;
    }

    , ValidateStep: function (step) {
        var valid = true;
        if (this.Find(['radios', 'checks', 'images', 'radios2'], function(a) {return a == step.type;})) {
            if (this.FindIdx(step.questions[0].answers, function (a) { return a.result; }) < 0) {
                this.ShowValidationError(this._defaultValidationError);
                $('.radio .question').addClass('question-error');
                valid = false;
            }
        }

        if (step.group == 'first') {
            this.CheckGenderAgeHighlight(); if (valid && (!this._gender || !this._age_range)) { this.ShowValidationError(this._defaultValidationError); valid = false; }
        }

        return valid;
    }

    , CheckGenderAgeHighlight: function (els) {
        els = els || [$('#gender'), $('#age_range')];
        $.each(els, function (i, it) { if (!it.val()) { it.closest('div').addClass('error'); } else { it.closest('div').removeClass('error'); } });
    }

    , GetStats: function () {

        var data = this._render_data; if (!data || !data.subdatas) return this._stats;
        var stepStack = $.map(data.subdatas, function (it) { return it.step; });

        if (stepStack.length <= 1) return this._stats;
        var stats = { patientType: 'A', resultCondition: '', resultImage: null };

        var step = this.Find(stepStack, function (a) { return a.group == 'first' });
        if (step) {
            var ans = this.Find(step.questions[0].answers, function (a) { return a.result; });
            if (ans) stats.patientType = ans.value;
        }

        var p = this;
        this.ForAll(['Goals', 'Bite'], function (g) {
            step = p.Find(stepStack, function (a) { return a.group == g; });
            if (step) {
                var ans = p.Find(step.questions[0].answers, function (a) { return a.result; });
                if (ans && ans.result_image && ans.result_text) {
                    var img = ans.email_image ? ans.email_image : ans.result_image;

                    stats.resultImage = img.indexOf('images/') == 0 ? img : 'images/Results/BiteImages/' + p.Last(img.split('/'));
                    stats.resultCondition = ans.result_text;
                }

                if (step.group == 'Goals' && ans) {
                    if (ans.sample_url) stats.sample_url = ans.sample_url;
                    if (ans.sample_image) stats.sample_image = ans.sample_image;
                }
            }
        });

        step = p.Find(stepStack, function (a) { return a.group == 'Spacing'; });
        if (step) {
            var q = step.questions[0];
            var u = parseInt(q.answers[0].result);
            var l = parseInt(q.answers[1].result);
            if (u < 1) u = 1;
            if (l < 1) l = 1;
            if (u > 5) u = 5;
            if (l > 5) l = 5;

            var k = u + '_' + l;

            stats.secondaryCondition = q.slider_map[k] || '';

            if (!stats.resultImage) {
                stats.resultCondition = stats.secondaryCondition;
                stats.resultImage = 'images/Results/SpacingCrowdingImages/U' + u + 'L' + l + '.png';
                stats.secondaryCondition = '';
            }
        }
        return stats;
    }

    , ShowErrorPopup: function (opt) {
        if (!opt) return;
        var el = $(opt.anchor); var content = opt.text || ''; var delayhide = opt.delay || 5000;
        var d = el.data('custom-msg');
        if (!d) {
            el.data('custom-msg', { init: true, current: 0 });
            el.popover({ content: content, placement: 'auto', trigger: 'manual' });
            el.on('hidden.bs.popover', function () { });
        }
        var d = el.data('custom-msg');
        if (d.timeout) { clearTimeout(d.timeout); d.timeout = null; }
        d.current++;
        if (delayhide) { d.timeout = setTimeout(function () { d.timeout = null; el.popover('hide'); }, delayhide); }
        el.data('custom-msg', d);
        el.popover('show');
    }

    , GetBkgImage: function (step) { if (step.type == 'end') { return; } var idx = this._stepStack.length; if (idx < this._bkgImages.length) { return this._bkgImages[idx]; } return this._bkgImages.length > 0 ? this._bkgImages[0] : null; }
    , SetCreateInput: function (id, val) { var el = $('#' + id); if (!el.size()) { el = $('<input />', { type: 'hidden', id: id, name: id, value: val }); $('#step-container').append(el); } else { el.val(val); } }
    , ShowPostalCodeMsg: function () { this.ShowErrorPopup({ anchor: '#sa-pc-anchor', text: this._postalCodeHelpMsg }); }
    , ShowValidationError: function (msg) { this.ShowErrorPopup({ anchor: '.btn-next', text: msg }); }
    , CloseErrorPopup: function () { try { $('*[data-original-title]').popover('hide'); } catch (ex) { } }

    , ScrollToResultsTop: function () {
        if (this._scrollingRunning) return;
        this._scrollingRunning = true; var p = this;
        window.setTimeout(function () {
            p._scrollingRunning = false;
            var topEl = $("#results-top");
            if ($(document).width() < 550) { var el = $('.content h1:first'); if (el.size() > 0) topEl = el; }
            if (topEl.size() && topEl.offset()) { $('html,body').animate({ scrollTop: topEl.offset().top }, 'slow'); }
        }, 50);
    }

    , ScrollTo: function (sel) { var el = $(sel); window.setTimeout(function () { var nav = $('nav'); var diff = 0; if (nav.size() && nav.css('position') == 'fixed') { diff = (nav.height() || 0) + 20; } if (el.size() && el.offset()) { $('html,body').animate({ scrollTop: el.offset().top - diff }, 'slow'); } } , 50); }
    , GTMTrack: function (event, eventLabel) { try { if (window['_CommonHelper']) { window['_CommonHelper'].GTMTrackEvent(event, eventLabel); } } catch (ex) { } }
    , GATrackLink: function (linkName) { this.GATrackEvent('Click ' + linkName); }

    , GATrackQuestion: function (step) {
        if (this._trackedQuestion[step.uid]) { return; }
        this._trackedQuestion[step.uid] = true;

        var formatAnswersForStep = function(step, answers){ var resArr = $.map(answers, function(a) { return step.type == 'sliders' ? a.result : a.uid; }); return resArr.join('|'); };
        if (step && step.questions && step.questions.length) {
            var q = step.questions[0];
            var selectedAnswers = step.type == 'sliders' ? q.answers : this.Filter(q.answers, function (a) { return a.result; });
            if (selectedAnswers.length) {
                var answers = formatAnswersForStep(step, selectedAnswers);
                this.GATrackEvent('Q_' + step.group.replace(/ /g, ''), answers);
            }
        }
    }

    , GATrackPage: function (step) {
        if (this._trackedPage[step.uid]) { return; }
        this._trackedPage[step.uid] = true;

        var view = '';
        if (step.group == 'first') { view = 'welcome'; this.GTMTrack('smile_started'); }
        else if (step.group == 'Location') { view = 'sendemail'; }
        else if (step.type == 'end') { view = 'thankyou'; }
        else { view = 'Q_' + step.group.replace(/ /g, ''); }
        
        var pageUrl = '/SelfAssessment/' + view;
        if (window['_CommonHelper']) window['_CommonHelper'].GATrackPage(pageUrl);
    }

    , GATrackEvent: function (ev, evSub) {
        var arr = ['_trackEvent', 'Smile Assessment', ev];
        if (evSub) arr.push(evSub);

        if (window['_CommonHelper']) window['_CommonHelper'].GATrackEvent(arr[1], arr[2], arr[3], arr[4], arr[5]);
    }

    , InvokeConversion: function () {
        try {
            if (this._conversionOnce) return;
            this._conversionOnce = true;

            var gth = window['_googleTagsHelper'] || window.parent['_googleTagsHelper'];
            if (gth && gth['ExecuteTagsForGroup']) { gth['ExecuteTagsForGroup']('2'); }

            this.GTMTrack('smile_completed');
        }
        catch (ex) { }
    }

    , IsSmallScreen: function () { return $(window).width() <= 640; }
    , IsMediumScreen: function () { return $(window).width() <= 1024; }
    , GetStepByGroup: function (n) { var step = this.Find(this.data.steps, function (s) { return s.group == n; }); return step; }
    , GetOutcomeTextByGroup: function (n) { var step = this.GetStepByGroup(n); return step && step.questions && step.questions.length ? step.questions[0].outcome_text : null; }
    , GetSelectedAnswersByGroup: function (n) { var step = this.GetStepByGroup(n); if (!(step && step.questions && step.questions.length && step.questions[0].answers)) { return; } var selectedAnswers = this.Filter(step.questions[0].answers, function (a) { return a.result; }); return selectedAnswers; }

    , DebugOut: function (o) { try { console.log(o); } catch (ex) { } }
    , FindIdx: function (arr, func) { for (var i = 0; i < arr.length; i++) { if (func(arr[i])) return i; } return -1; }
    , Find: function (arr, func) { for (var i = 0; i < arr.length; i++) { if (func(arr[i])) return arr[i]; } return null; }
    , Filter: function (arr, func) { var newArr = []; for (var i = 0; i < arr.length; i++) { if (func(arr[i])) newArr.push(arr[i]); } return newArr; }
    , ForAll: function (arr, func) { for (var i = 0; i < arr.length; i++) { func(arr[i], i); } }
    , Last: function (arr) { return arr[arr.length - 1]; }
};

$(function () { _SAHelper.Init(); });