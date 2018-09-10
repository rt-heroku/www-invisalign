var _utility = {
    _initialized: false
    , _searchUrl: null
    , _interestUrl: null
    , _emailPattern: /^\w+([-+.\']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    , _captchaInitialized: false
    , _captchaLoaded: false
    , _captchaKey: null
    , _interestReturnUrl: null
    , _flashUrl: '/Content/flash/InvisalignPlayer.swf'
    , _useFBox: false
    , _playerCounter: 0
    , _playerCache: {}

    , Init: function () {
        try { this.InitCountryPicker(); } catch (ex) { }
        try { this.InitVideos(); } catch (ex) { }
        try { this.InitGTMData(); } catch (ex) { }
        try { this.InitSlick(); } catch (ex) { }
        try { this.InitCustomCarousels(); } catch (ex) { }
        try { this.InitCarouselSwipe(); } catch (ex) { }
        try { this.InitCarousel(); } catch (ex) { }
        try { this.InitDownArrows(); } catch (ex) { }
        try { this.InitSearch(); } catch (ex) { }
        try { this.InitInterestForm(); } catch (ex) { }
        try { this.InitStoryCarouselControls(); } catch (ex) { }
        try { this.InitModifyLinksForFB(); } catch (ex) { }
        try { this.InitHighlightProviderOccurrences(); } catch (ex) { }
        try { this.InitSimulationToggles(); } catch (ex) { }
        try { this.InitAnimSlides(); } catch (ex) { }
        try { this.InitSiteLeave(); } catch (ex) { }
        try { this.InitOPROForms(); } catch (ex) { }
    }

    , InitSiteLeave: function () {
        var p = this;
        $('#site-leave-button').click(function () { if (p._siteLeaveUrl) { window.location.href = p._siteLeaveUrl; } $('#site-leave-container').modal('hide'); });
    }

    , InitAnimSlides: function () {
        $('.anim-slide').each(function () {
            var el = $(this);
            var elCls = el.attr('class');
            var arr = /rng-(\d+)/i.exec(elCls);
            var rngRange = 12;
            if (arr && arr.length > 1) { rngRange = parseInt(arr[1]); }

            var imgArr = [];

            var elText = el.find('.bbanner-text');
            var img = elText.find('img');
            var src = img.attr('src');
            if (src) {
                imgArr.push(img);

                var arr = /^(.*)(\d\d)(\.\w+)$/.exec(src);
                if (arr && arr.length) {
                    var numFirst = parseInt(arr[2]);
                    var imgPar = img.parent();

                    for (var i = numFirst; i < numFirst + rngRange; i++) {
                        var str = '' + i; if (str.length == 1) { str = '0' + str; }
                        var newSrc = arr[1] + str + arr[3];

                        var newImg = $('<img style="display:none;" src="' + newSrc + '" />');
                        imgPar.append(newImg);
                        imgArr.push(newImg);
                    }
                }
            }

            var rng = $('<input type="range" min="0" max="' + (rngRange - 1) + '" value="0" step="0.01" class="anim-slider" />');
            var rngCont = $('<div class="rng-container"></div>');
            rngCont.append(rng);
            elText.append(rngCont);

            var txtCont = $('<div class="txt-container"></div>');
            elText.append(txtCont);

            var setText = function () { var idx = Math.round(rng.val()); txtCont.html('Week ' + (idx + 1)); }
            setText();

            rng.on('input change', function () {
                var idx = Math.round($(this).val());
                if (imgArr[idx]) {
                    imgPar.find('img').hide();
                    imgArr[idx].show();
                    setText();
                }
            });
        });
    }

    , InitGTMData: function () {
        var p = this;

        $('.gtmdata').each(function () {
            var cl = $(this).attr('class');
            var a = $(this).find('a');
            if (a.size()) {
                var arr = /gtm-([\w-_]+)/.exec(cl);
                if (arr && arr.length >= 2) { var gt = arr[1].replace(/-/g, ':'); a.attr('data-gtm', gt); }
            }
        });

        $('*[data-gtm]').each(function() {
            var e = $(this);
            var gtm = e.attr('data-gtm');
            var parts = gtm.split(':');
            if (gtm) {
                e.click(function () {
                    if (parts.length == 1) { p.GTMTrackEvent(parts[0]); }
                    else { p.GTMTrackEvent(parts[0], parts[1]); }
                });
            }
        });
    }

    , InitSimulationToggles: function () {
        var cnt = 0;
        $('.sim-toggle').each(function () {
            var el = $(this);
            var b = el.parent();
            var chId = 'sms-check-' + cnt;
            var imgUrl = el.css('backgroundImage');
            var imgUrl2 = imgUrl.replace('_before', '_after');
            var img = new Image();
            img.src = imgUrl2.replace('url("', '').replace('")', '');
            b.append('<div class="sms-slide2 clr-white bkg-lblue"><div class="clr-white sms-label2">Before</div><label class="switch"><input type="checkbox" id="' + chId + '" class="sms-slide-input"><span class="slider round"></span></label></div>');
            $('#' + chId).change(function () {
                var c = $(this);
                el.css('backgroundImage', c.prop('checked') ? imgUrl2 : imgUrl);
                var lbl = b.find('.sms-label2');
                lbl.html(c.prop('checked') ? 'Visualisation' : 'Before');
                if (c.prop('checked')) { lbl.addClass('right'); } else { lbl.removeClass('right'); }
            });
            cnt++;
        });
    }

    , InitModifyLinksForFB: function () { try { this.CheckModifyLinksForFB(); } catch (ex) { } }
    , InitHighlightProviderOccurrences: function () { try { if (window['_highlightProviderOccurrences']) { this.HighlightProviderOccurrences(); } } catch (ex) { } }

    , InitCarouselSwipe: function () {
        $('.carousel').swipe({
            swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                if (direction == 'left') { $(this).carousel('next'); }
                else if (direction == 'right') { $(this).carousel('prev'); }
            }
            , allowPageScroll: 'vertical'
        });
    }

    , InitStoryCarouselControls: function () {
        var p = this;
        $('.story-outer').closest('.bcarousel').each(function () {
            var c = $(this);
            var bimg = c.find('.bbanner-img').first();

            if (bimg.size() > 0 && bimg.height()) {
                c.find('.carousel-control').height(bimg.height() - (p.IsSmallScreen() ? 0 : 50));
            }
        });
    }

    , InitOPROForms: function () {
        this.InitOPROForms1();
        this.InitOPROForms2();
    }

    , CopyOPROOptIn: function (f) {
        var b = f.find('.btn');
        var h = $('#interest-offers-accept').closest('p,div').html().replace('id="interest-offers-accept"', '').replace(' Go', ' ' + b.text());
        $(h).insertBefore(b.closest('p,div'));
    }

    , ShowOPROThankYou: function (f) {
        f.find('p,label,.row').remove();
        f.find('h3').after('<h3>Thank You</h3>');
    }

    , InitOPROForms1: function () {
        var p = this;
        var f1cont = $('.opro-parent-infokit');
        if (f1cont.size()) {
            f1cont.find('.btn').attr('id', 'pk-submit');
            var h = f1cont.html();
            f1cont.html('<form>' + h + '</form>');
            var f = f1cont.find('form');
            this.CopyOPROOptIn(f);
            $('#footer_form').find('input[type=hidden]').each(function () { var n = $(this).clone(); if (n.attr('name') == 'first_name') { return; } if (n.attr('name') == 'request_type') { n.val('OPROInfoKit'); } f.append(n); });
            var ruQ = $('<input />', { type: 'hidden', name: 'return_url', id: 'return_url' }); ruQ.val(p._interestReturnUrl); f.append(ruQ);

            fieldData = [
                 { elementId: 'pk-email', rules: [{ type: 'required' }, { type: 'regexp', pattern: /^\w+([-+.\']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ }] }
                , { elementId: 'pk-first-name', rules: [{ type: 'required' }] }
            ];

            var captchaCreated = false; var rcinst = null;
            var checkCreateCaptcha = function () { if (!captchaCreated) { captchaCreated = true; $('#pk-submit').parent().prepend('<p class="opro-captcha-cont" id="opro-captcha-cont1"></p>'); try { rcinst = grecaptcha.render('opro-captcha-cont1', { 'sitekey': p._captchaKey }); } catch (e) { } } };
            f.formhelper({
                fieldData: fieldData, submitId: 'pk-submit', submitUrl: this._interestUrl, returnUrl: this._interestReturnUrl
                , preValidate: function (sender, data) { return true; }
                , postFieldValidate: function (sender, data) { var field = data.field; var el = $('#' + field.elementId); if (field.isValid) { checkCreateCaptcha(); el.removeClass('has-error'); } else { el.addClass('has-error'); } }
                , postValidate: function () { var t = f.find('textarea[name=g-recaptcha-response]'); if (!t.val()) { $('#opro-captcha-cont1').addClass('has-error'); return false; } else { $('#opro-captcha-cont1').removeClass('has-error'); } var names = p.TrySplitName($('#pk-first-name').val()); $('#pk-first-name').val(names[0]); f.find('input[name=last_name]').val(names[1] || 'NA'); return true; }
                , postSubmit: function (sender, data) {
                    if (data.code == '200') {
                        $('#pk-email,#pk-phone').val('');
                        //window.open('https://eu-conweb.s3.amazonaws.com/misc/ParentInfoKit.pdf', '_blank');
                        window.location.href = 'https://eu-conweb.s3.amazonaws.com/misc/ParentInfoKit.pdf?download';
                        p.ShowOPROThankYou(f);
                    }
                    try { grecaptcha.reset(rcinst); } catch (ex) { }
                }
            });
        }
    }

    , InitOPROForms2: function () {
        var p = this;
        var f2cont = $('.opro-request-callback');
        if (f2cont.size()) {
            f2cont.find('.btn').attr('id', 'rc-submit');
            var h = f2cont.html();
            f2cont.html('<form>' + h + '</form>');
            var f = f2cont.find('form');
            this.CopyOPROOptIn(f);
            $('#footer_form').find('input[type=hidden]').each(function () { var n = $(this).clone(); if (n.attr('name') == 'first_name') { n.attr('name', 'email').val('na@na.com'); } if (n.attr('name') == 'request_type') { n.val('OPRORequestCallBack'); } f.append(n); });
            var ruQ = $('<input />', { type: 'hidden', name: 'return_url', id: 'return_url1' }); ruQ.val(p._interestReturnUrl); f.append(ruQ);

            fieldData = [
                 { elementId: 'rc-name', rules: [{ type: 'required' }] }
                , { elementId: 'rc-phone', rules: [{ type: 'required' }] }
            ];

            var captchaCreated = false; var rcinst = null;
            var checkCreateCaptcha = function () { if (!captchaCreated) { captchaCreated = true; $('#rc-submit').parent().prepend('<p class="opro-captcha-cont" id="opro-captcha-cont2"></p>'); try { rcinst = grecaptcha.render('opro-captcha-cont2', { 'sitekey': p._captchaKey }); } catch (e) { } } };
            f.formhelper({
                fieldData: fieldData, submitId: 'rc-submit', submitUrl: this._interestUrl, returnUrl: this._interestReturnUrl
                , preValidate: function (sender, data) { return true; }
                , postFieldValidate: function (sender, data) { var field = data.field; var el = $('#' + field.elementId); if (field.isValid) { checkCreateCaptcha(); el.removeClass('has-error'); } else { el.addClass('has-error'); } }
                , postValidate: function () { var t = f.find('textarea[name=g-recaptcha-response]'); if (!t.val()) { $('#opro-captcha-cont2').addClass('has-error'); return false; } else { $('#opro-captcha-cont2').removeClass('has-error'); } var names = p.TrySplitName($('#rc-name').val()); $('#rc-name').val(names[0]); f.find('input[name=last_name]').val(names[1] || 'NA'); return true; }
                , postSubmit: function (sender, data) {
                    if (data.code == '200') {
                        $('#rc-name,#rc-phone').val('');
                    }
                    try { grecaptcha.reset(rcinst); } catch (ex) { }
                    p.ShowOPROThankYou(f);
                }
            });
        }
    }

    , TrySplitName: function (n) { if (!n) return ['', '']; var parts = n.split(/\s+/gi); if (parts.length <= 1) { return [n, '']; } return [parts.slice(0, parts.length - 1).join(' '), parts[parts.length - 1]]; }

    , InitCountryPicker: function () {
        var p = this;
        $('#country_picker').change(function () {
            var v = $(this).val();
            window.location.href = v.split('|')[1];
        });
    }

    , InitInterestForm: function () {
        var el = $('#interest_email'); var p = this; var loading = false;
        var formcontainer = $('#footer_form');
        var captchacontainer = $('#interest_captcha');
        var handleChange = function () {
            window.setTimeout(function () {
                var email = $.trim(el.val());
                if (!email || !p._emailPattern.test(email)) return;
                if (!p._captchaInitialized) {
                    p._captchaInitialized = true;
                    grecaptcha.render('interest_captcha', { sitekey: p._captchaKey });
                }

            }, 100);
        };
        el.keydown(handleChange).change(handleChange);

        var handleFormCallback = function () { formcontainer.hide(); }
        $('#interest_submit').click(function () {
            if (loading) return;
            var valid = true;
            var email = $.trim(el.val());
            if (!email || !p._emailPattern.test(email)) { el.addClass('has-error'); valid = false; } else { el.removeClass('has-error'); }

            var c = formcontainer.find('textarea[name="g-recaptcha-response"]');
            if (c.size() == 0) { valid = false; }
            else if (!c.val()) { captchacontainer.addClass('has-error'); valid = false; } else { captchacontainer.removeClass('has-error'); }

            if (!valid) return;

            var f = $('<form/>'); f.attr('method', 'post'); f.attr('action', p._interestUrl);
            formcontainer.find('input,textarea,select').each(function () {
                var inp = $(this); if (inp.attr('type') == 'checkbox' && !inp.prop('checked')) { return; }  var newInp = $('<input type="hidden" />'); newInp.attr('name', inp.attr('name')); newInp.val(inp.val()); f.append(newInp);
            });
            var ruQ = $('<input />', { type: 'hidden', name: 'return_url' });
            ruQ.val(p._interestReturnUrl); f.append(ruQ);
            $('body').append(f);

            var options = { success: function (a, b, c, d, e) {handleFormCallback(a, b, e); }, error: function () { handleFormCallback('', ''); }, type: 'POST', iframe: true, skipEncodingOverride: false };
            loading = true;
            window.setTimeout(function () { f.ajaxSubmit(options); }, 200);
        });
    }

    , InitSearch: function () {
        var p = this;
        $('#search-box2').keydown(function (event) { if (event.keyCode == '13') { event.preventDefault(); p.DoSearch(); } });
    }

    , InitDownArrows: function () {
        var navHeight = $('nav').height() || 0; var p = this;
        $('.arrow-down-inner').click(function (e) {
            e.preventDefault();
            var el = $(this);
            var b = el.closest('.bbanner');
            if (b.size() == 0) { return; }
            var offs = b.offset();
            if (!offs) return;
            $('html,body').animate({ scrollTop: offs.top + b.height() - navHeight });
        });
    }

    , InitCustomCarousels: function () {
        var p = this;
        $('.carousel-custom').each(function () { p.InitCustomCarousel($(this)); });
    }

    , InitCustomCarousel: function (sel) {
        var elements = sel.find('.item-custom');
        if (elements.size() <= 1) return;

        var items = []; elements.each(function () { items.push($(this)); });
        var inner = sel.find('.carousel-inner');
        var curr = 0; var time = 500; var animating = false;

        var oncomplete = function () {
            var h = items[curr].is(':visible') ? items[curr].height() : items[curr].closest(':visible').height();
            h = h || 100;
            inner.css({ height: h });
            elements.css({ top: -2000 });
            items[curr].css({ top: 0 });
        };

        oncomplete();
        var la = sel.find('.left.carousel-control');
        var ra = sel.find('.right.carousel-control');

        var handleClick = function (e, r) {
            e.preventDefault();
            if (animating) return;
            animating = true;
            var new_curr = r ? (curr + 1 >= items.length ? 0 : curr + 1) : (curr - 1 < 0 ? items.length - 1 : curr - 1);
            var new_it = items[new_curr];
            var w = inner.width();
            items[new_curr].css({ left: r ? w : -w, top: 0 });
            items[curr].animate({ left: r ? -w : w }, time, function () { curr = new_curr; animating = false; oncomplete(); })
            items[new_curr].animate({ left: 0 }, time);
        }

        ra.click(function (e) { handleClick(e, true); });
        la.click(function (e) { handleClick(e, false); });
    }

    , InitSlick: function () {
        this.InitSlickInner($('.slick-inner'));
        this.InitSlickInner($('.slick'));
    }

    , InitSlickInner: function (sel) {
        sel.each(function () {
            var el = $(this);
            var d = el.attr('data-slick');
            var obj = {};
            if (d) { eval('obj=' + d); }
            el.slick(obj);
        });
    }

    , InitCarousel: function () {
        var p = this;

        $(window).scroll(function () {
            $('.carousel').each(function () {
                var c = $(this);
                if (c.hasClass('noenabledisable')) return;
                if (c.is(':in-viewport')) {
                    p.EnableCarousel(c, true);
                }
                else { p.EnableCarousel(c, false); }
            });
        });

        //$(window).on('resize orientationchange', function () { p.NormalizeCarousel(); });
        //p.NormalizeCarousel();
    }

    , ShowSiteLeavePopup: function (el) {

        var mod = $('#site-leave-container');
        if (!mod.size()) { return true; }

        if (!el) return true;
        var url = $(el).attr('href');
        if (!url) return true;
        this._siteLeaveUrl = url;
        mod.modal('show');
        return false;
    }

    , NormalizeCarousel: function () {
        var setMinHeight = function (el, h) {
            var a = [el];
            var chd = el.children('div');
            if (chd.size() == 1) a.push(chd);
            $.each(a, function (i, it) {
                it.css('min-height', !h ? '0' : h + 'px');
            });
        };
         
        $('.carousel').each(function () {
            var carousel = $(this);
            var items = carousel.find('.item');
            if (items.size() <= 1) return;

            items.each(function () { setMinHeight($(this), 0); });

            var tallest = 0;
            items.each(function () { 
                var h = $(this).height() || 0;
                if (h > tallest) { tallest = h; }
            });

            if (tallest) { items.each(function () { setMinHeight($(this), tallest); }); }
        });
    }

    , InitVideos: function () {
        var p = this;
        $('*[data-yt-play]').each(function () {
            var btn = $(this);
            var v = $(this).closest('.bbanner-img').find('video');
            v.bind('play', function () { btn.hide(); });
            v.bind('pause', function () { btn.show(); });
            v.bind('ended', function () { btn.show(); });

            if (v.size() && v.attr('autoplay') && !p.IsMediumScreen()) { $(this).hide(); return; }
        });

        $('*[data-yt-play]').click(function () {
            var v = $(this).closest('.bbanner-img').find('video');
            if (v.size()) { v.get(0).play(); return; }

            var s = $(this).closest('*[data-yt]');
            if (s.size() > 0) {
                var url = s.attr('data-yt') + '&origin=' + encodeURIComponent(window.location.protocol + '//' + window.location.host);
                s.addClass('video-container');
                var frameId = 'player_' + (p._playerCounter++);
                s.append('<iframe id="' + frameId + '" frameborder="0" allowfullscreen="1" title="YouTube video player" class="video-frame" src="' + url + '"></iframe>')
                var carousel = $(this).closest('.bcarousel');
                var hasCarousel = carousel.size() > 0;

                var player = new YT.Player(frameId, {
                    events: {
                        'onReady': function () {  },
                        'onStateChange': function (event) { if (hasCarousel) { if (event.data == YT.PlayerState.ENDED || event.data == YT.PlayerState.PAUSED) { p.EnableCarousel(carousel, true, true); } else { p.EnableCarousel(carousel, false, true); } } }
                    }
                });
                p._playerCache[frameId] = player;
            }
        });
    }

    , EnableCarousel: function (carousel, enable, locked) {
        if (!locked && carousel.data('locked')) return;
        var ctrls = carousel.find('.carousel-control');
        if (enable) {
            if (locked) { carousel.data('locked', false); }
            if (ctrls.is(':visible')) return;
            ctrls.show();
            var opts = carousel.data()['bs.carousel'].options;
            var dataInterval = carousel.attr('data-interval');
            if (dataInterval == 'false' || dataInterval === false) { return; }
            opts.interval = dataInterval;
            carousel.data({ options: opts });
            carousel.carousel('cycle');
        }
        else {
            if (locked) { carousel.data('locked', true); }
            if (!ctrls.is(':visible')) return;
            ctrls.hide();
            carousel.carousel('pause');
            var opts = carousel.data()['bs.carousel'].options;
            opts.interval = false;
            carousel.data({ options: opts });
        }
    }

    , ScrollToBlock: function (b) {
        this.ScrollTo($('[data-block-id="' + b + '"]'));
    }

    , ScrollTo: function (sel) {
        var el = $(sel);
        window.setTimeout(function () {
            var nav = $('nav'); var diff = 0; if (nav.size() && nav.css('position') == 'fixed') { diff = nav.height() || 0; }
            if (el.size() && el.offset()) {
                $('html,body').animate({ scrollTop: el.offset().top - diff }, 'slow');
            }
        }
        , 50);
    }

    , DoSearch: function () {
        var inp = $('#search-box2');
   
        var val = $.trim(inp.val());
        if (val && this._searchUrl) {
            var url = this.AddUrlParams(this._searchUrl, { q: val });
            window.location.href = url;
        }
    }

    , AddUrlParams: function (url, parms) {
        var arr = []; for (var n in parms) { arr.push(encodeURIComponent(n) + '=' + encodeURIComponent(parms[n])); }
        return url + (url.indexOf('?') >= 0 ? '&' : '?') + arr.join('&');
    }

    , GetUrlParameters: function (q) {
        var res = {};
        q = q || window.location.search;
        if (!q || q == '') return res;
        q = q.replace(/^.*\?/, '');

        var arr = q.split('&');
        for (var i = 0; i < arr.length; i++) {
            var kv = arr[i];
            var pos = kv.indexOf('=');
            if (pos < 0) { res[kv] = ''; }
            else { res[kv.substring(0, pos)] = decodeURIComponent(kv.substr(pos + 1)); }
        }
        return res;
    }

    , HighlightProviderOccurrences: function () {
        var p = this;
        $('article p').each(function () {
            var el = $(this);
            var re = /(Invisalign Provider)/gi;

            el.find('*').andSelf().contents().filter(function () {
                if (this.nodeType === 3) {
                    if (re.test(this.nodeValue)) return true;
                }
                return false;
            }).each(function () {
                var txt = this.nodeValue;
                var txt = txt.replace(re, '$1 <span class="info-icon" title="Gli Invisalign Provider sono ortodontisti o odontoiatri che hanno completato il corso di formazione offerto da Align Technology, necessario per poter inizare a curare i pazienti con il Sistema Invisalign. Gli Invisalign Provider non sono assunti da Align Technology e forniscono consulenze e servizi medici indipendenti in favore dei propri pazienti in piena autonomia e sotto la propria responsabilità professionale."></span>');

                $(this).replaceWith(txt);
            });
        });

        $('span.info-icon').tooltip({ content: function () { return $(this).attr('title').replace(/\|/g, '<br/>'); } });
    }

    , ShowPopupFromLink: function (linkElement, opts) {
        if (linkElement && opts) {
            var jqEl = $(linkElement);
            var href = jqEl.attr('href');
            if (href) {
                opts.url = href;
                opts.jqEl = jqEl;
                this.ShowPopup(opts);
            }
        }
        return false;
    }

    , ShowPopup: function (opts) {
        if (!opts) return;
        this.CollapseNavi();

        if (opts.video) { if (opts.url && this.IsVideoSmallerThanScreen(opts)) { var url = this.AddUrlParams(opts.url, { 'fullscreen': '1' }); window.location.href = url; return false; } opts.content = this.GetVideoEmbedHtml(opts); }
        opts.width = opts.width || 800;
        opts.height = opts.height || 600;

        if (opts.url && this.IsWidthSmallerThanScreen(this.GetNumber(opts.width))) {
            var url = this.AddUrlParams(opts.url, { 'standalone': '1' });
            window.location.href = url;
            return false;
        }

        if (this._useFBox) {
            var fbOpts = {
                width: opts.width
                , height: opts.height + 6
                , type: opts.url ? 'iframe' : ''
                , href: opts.url
                , transitionOut: 'elastic'
                , speedIn: 200
                , speedOut: 200
                , overlayShow: true
                , padding: opts.padding || 30
                , autoScale: opts.autoScale || false
                , content: opts.content
            };
            $.fancybox(fbOpts);
        }
        else {
            var padding = opts.padding || 0, width = opts.width, height = opts.height + 6, outerWidth = opts.width + padding * 2, outerHeight = opts.height + padding * 2 + 6;

            var container = $("#modal-Container2")
            if (!container.size()) { container = $('<div id="modal-Container2" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content2"></div></div></div>'); $('body').append(container); }

            var dlg = container.find('.modal-dialog');
            dlg.attr('style', 'width:' + outerWidth + 'px !important;');
            var dlgContent = dlg.find('.modal-content2');
            dlgContent.css({ 'padding': opts.padding + 'px' });

            var content = opts.content || '<iframe frameBorder="0" src="' + opts.url + '" style="width:' + width + 'px;height:' + height + 'px;" border="0" ></iframe>';
            dlgContent.html('<a class="close2" data-dismiss="modal" aria-hidden="true" aria-label="Close"></a>' + content);

            container.modal("show").on('hidden.bs.modal', function () { container.remove(); if (opts.onclose) { try { opts.onclose(opts); } catch (ex) { } } });
        }
        return false;
    }

    , ShowInplacePopup: function (linkElement, noIframe, opts) {
        var url = $(linkElement).attr('href');
        return this.ShowInplacePopupWithUrl(url, noIframe, opts);
    }

    , ShowInplacePopupWithUrl: function (url, noIframe, opts) {
        if (this.IsSmallScreen()) {
            url = url.replace(/\??popup=\w+/i, '');
            window.location.href = url;
            return false;
        }

        this.CollapseNavi();
        var p = this;
        var showContent = function (content, trackFrameId) {
            var popup = $("#modal-Container")

            var extraAttr = '';
            if (opts) { if (opts.preventClose) { extraAttr = 'data-keyboard="false" data-backdrop="static"'; } }
            if (!popup.size()) { popup = $('<div id="modal-Container" class="modal fade" ' + extraAttr + ' tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content panel-top-4 clearfix col-lg-12 fnone"><a class="close" data-dismiss="modal" aria-hidden="true" aria-label="Close">&times;</a><div class="col-lg-12 fnone no-padding center-block"><div class="modal-body clearfix col-lg-10"></div></div></div></div></div>'); $('body').append(popup); }

            var timer = null;
            if (trackFrameId) { timer = setInterval(function () { var fr = $('#' + trackFrameId); if (!fr.size()) return; var frDoc = fr[0].contentDocument || fr[0].contentWindow.document; var frDocJQ = $(frDoc); var b = $(frDoc.body); b.css('overflow-y', 'hidden'); var h = b.height(); if (h) { fr.css('height', (h)); } }, 250); }
            popup.modal("show").on('hidden.bs.modal', function () { if (timer) { window.clearInterval(timer); } popup.remove(); }).find('.modal-body').html(content);
        };

        if (noIframe) {
            $.ajax({
                type: "GET", url: url,
                success: function (data) { var page = $(data); var inner = page.filter('#page_content'); var html = inner ? inner.html() : data; showContent(html); }
            });
        }
        else {
            var frameId = 'popupIframe';
            var minH = '400';
            var html = this.OuterHtml($('<iframe frameBorder="0" id="' + frameId + '" style="width:100%; min-height:' + minH + 'px;border-width:0px;" src="' + url + '" border="0" />'));
            showContent(html, frameId);
        }

        return false;
    }

    , IsOldIE: function () {
        try { if ($.browser.msie && /^[789]\./.test($.browser.version)) return true; } catch (ex) { } return false;
    }

    , IsSmallScreen: function () {
        return $(window).width() <= 640;
    }

    , IsMediumScreen: function () {
        return $(window).width() <= 1024;
    }

    , IsVideoSmallerThanScreen: function (opts) {
        return $(window).width() < opts.width;
    }

    , IsWidthSmallerThanScreen: function (width) {
        return $(window).width() < width;
    }

    , CollapseNavi: function () {
        try { var nav = $('nav'); if (nav.hasClass('in')) nav.collapse('hide'); } catch (ex) { }
    }

    , ClosePopup: function () {
        try {
            $('#modal-Container,#modal-Container2').modal('hide');
        }
        catch (ex) { }
    }

    , HandleAccordionClick: function (linkElement) {

        if (!this._acFirst) {
            this._acFirst = true;

            var container = $('#accordion-story');
            var links = container.find("a[data-parent='#accordion-story']");
            var panels = container.find('.panel-collapse');

            var changeLink = function (expand, link) {
                if (expand) { link.find('span').addClass('arrow-up'); newLabel = link.data('expanded-text'); }
                else { link.find('span').removeClass('arrow-up'); newLabel = link.data('collapsed-text'); }

                link.contents().first(function () { return this.nodeType === 3; }).replaceWith(newLabel);
            }

            var handleExpand = function (expand, panel) {
                if (expand) {
                    links.each(function () { changeLink(false, $(this)); })
                }
                var id = panel.attr('id');
                if (id) {
                    links.each(function () {
                        var l = $(this);
                        if (l.attr('href') == '#' + id) { changeLink(expand, l); }
                    })
                }
            }

            panels.on('hide.bs.collapse', function () { handleExpand(false, $(this)); });
            panels.on('show.bs.collapse', function () { handleExpand(true, $(this)); });
        }
    }

    , HidePopup: function () {
        try { $.fancybox.close(); } catch (ex) { }
    }

    , EmbedVideoFromParams: function (jq) {
        var parms = this.GetUrlParameters();
        var opts = $.extend({}, parms, {
            width: this.GetNumber(parms["width"], 600)
            , height: this.GetNumber(parms["height"], 400)
            , video: parms["video"] || ""
            , autoplay: (parms["autoplay"] || "false") == "true"
            , noSound: (parms["noSound"] || "false") == "true"
        });
        if (!opts.video || !opts.video.length) return;

        this.EmbedVideo(jq, opts);
    }

    , EmbedVideo: function (jq, opts) {
        if (!opts.video) return;
        var html = this.GetVideoEmbedHtml(opts);
        if (!html || !html.length) return;

        if (html == 'flash') {
            var flashvars = {
                "flvpath": opts.video,
                "autoplay": opts.autoplay,
                "controlsOverVideo": "false",
                "playerHeight": '' + opts.height,
                "playerWidth": '' + opts.width,
                "showMuteButton": !opts.noSound
            };
            swfobject.embedSWF(this._flashUrl, jq.attr('id'), '' + opts.width, '' + (opts.height + 45), '9.0.0', 'expressInstall.swf', flashvars, { wmode: 'transparent' }, null);
        }
        else {
            var HandleResize = null;
            if (opts.fullscreen) {
                jq.addClass('youtube-container');
                var videoRatio = opts.width / opts.height;

                HandleResize = function () {
                    var cw = jq.width(), ch = jq.height(), ifr = jq.find('iframe');
                    if (!ifr.size()) return;
                    var ratio = cw / ch;
                    if (ratio > videoRatio) { ifr.height(ch); ifr.width(ch * videoRatio); ifr.css({ 'top': 0, 'left': (cw - ifr.width()) / 2 }); }
                    else { ifr.width(cw); ifr.height(cw / videoRatio); ifr.css({ 'top': (ch - ifr.height()) / 2, 'left': 0 }); }
                };
                $(window).resize(HandleResize);
            }

            var f = function () { jq.html(html); if (HandleResize) HandleResize(); };
            if (opts.waitLoad) { $(f); } else f();
        }
    }

    , GetVideoEmbedHtml: function (opts) {
        if (!opts.video) return '';

        if (opts.video.indexOf('youtube:') == 0) {
            var yturl = '//www.youtube.com/embed/' + opts.video.replace('youtube:', '');
            if (opts.autoplay) yturl += '?autoplay=1';
            //if (this.IsFF()) yturl += (yturl.indexOf('?') >= 0 ? '&' : '?') + 'html5=1';

            var ifr = $('<iframe />', { 'width': opts.width, 'height': opts.height, 'frameborder': 'frameborder', 'allowfullscreen': 'allowfullscreen', 'src': yturl });
            return this.OuterHtml(ifr);
        }

        if (window['swfobject'] && window['swfobject'].hasFlashPlayerVersion('1.0.0')) {
            return 'flash';
        }
        else {
            var m4vUrl = opts.video.replace(".flv", ".m4v");
            var vidq = $('<video />', { width: opts.width, height: opts.height, controls: opts.showControls ? 'controls' : true, src: m4vUrl, autoplay: opts.autoplay ? 'autoplay' : null });
            return this.OuterHtml(vidq);
        }
    }

    , OuterHtml: function (jq) { return jq.clone().wrap('<p>').parent().html(); }

    , SetupMiniDocLoc: function (opts) {
        var tq = $(opts.searchBox);
        var bq = $(opts.searchButton);

        var handle = function () {
            var s = $.trim(tq.val());
            if (s == '' || s == opts.def) return;
            var isZip = /\d/.test(s)
            var url = opts.searchPage + '?' + (isZip ? 'zip' : 'city') + '=' + encodeURIComponent(s);
            window.location.href = url;
        };

        tq.val(opts.def);
        tq.blur(function () { if (tq.val() == '') tq.val(opts.def); }).focus(function () { if (tq.val() == opts.def) tq.val(''); }).keydown(function (event) { if (event.keyCode == '13') { event.preventDefault(); handle(); } });
        bq.click(function () { handle(); });
    }

    , OpenLink: function (url, opts) {
        window.location.href = url;
    }

    , SetupTab: function () {
        $(".tab_content").hide(); //Hide all content
        $("ul.tabs li:first").addClass("active").show(); //Activate first tab
        $(".tab_content:first").show(); //Show first tab content

        //On Click Event
        $("ul.tabs li").click(function () {
            $("ul.tabs li").removeClass("active"); //Remove any "active" class
            $(this).addClass("active"); //Add "active" class to selected tab
            $(".tab_content").hide(); //Hide all tab content
            var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
            $(activeTab).fadeIn(); //Fade in the active content
            return false;
        });
    }

    , CheckModifyLinksForFB: function () {
        var params = this.GetUrlParameters();
        if (!params['invfbtrack_dotrack'] && params['invfbtrack_dotrack'] !== '') { return; }

        var decorateHref = function (href) { href += href.indexOf('?') < 0 ? '?' : '&'; for (var n in params) { if (n.indexOf('invfbtrack_') >= 0 && href.indexOf(n) < 0) { href += encodeURIComponent(n) + '=' + encodeURIComponent(params[n]) + '&'; } } href = href.replace(/&$/, ''); return href; };

        this.GATrackEvent('FB Tab Load', window.location.href);
        var prop = function (obj, propName) { return obj.get(0)[propName]; } // for the old jquery

        var currentHostname = window.location.hostname;
        $('a').each(function () {
            var lnk = $(this);
            var target = lnk.attr('target');
            if (!((typeof target == 'undefined') || target == '_self' || target == '')) return;

            var href = lnk.attr('href');
            if (!href) return;

            var linkHostname = prop(lnk, 'hostname');
            var protocol = prop(lnk, 'protocol');

            if (!linkHostname || !protocol || protocol.indexOf('http') < 0) return;

            if (linkHostname == currentHostname) {
                if (lnk.attr('onclick')) lnk.attr('href', decorateHref(href));

                lnk.click(function (ev) {
                    if (ev.shiftKey || ev.ctrlKey || (ev.which !== 1 && ev.which !== 0)) return;
                    lnk.attr('href', decorateHref(href));
                })
                .bind('contextmenu', function (ev) { ev.preventDefault(); });
            }
            else {
                lnk.attr('target', '_blank');
            }
        });
    }

    , IsFF: function () {
        try { return (/Firefox\/\d+/i).test(window.navigator.userAgent); } catch (ex) { }
        return false;
    }

    , GATrackPage: function (pageUrl) { if (!pageUrl) return; var arr = [pageUrl]; try { if (window['promoTrackingPrefixes']) { arr = arr.concat(window['promoTrackingPrefixes']); for (var i = 1; i < arr.length; i++) { arr[i] += pageUrl; } } } catch (ex) { } for (var i = 0; i < arr.length; i++) { pageUrl = arr[i]; this.Outp(['send', 'pageview', pageUrl]); try { ga('send', 'pageview', pageUrl); if (window['_gatrall']) { $.each(_gatrall, function (i, it) { ga(it + '.send', 'pageview', pageUrl); }); } } catch (ex) { } } }
    , GATrackEvent: function (eventName, ev1, ev2, ev3, ev4) { if (!eventName) return; var arr = [eventName]; try { if (window['promoTrackingPrefixes']) { arr = arr.concat(window['promoTrackingPrefixes']); for (var i = 1; i < arr.length; i++) { arr[i] += eventName; } } } catch (ex) { } for (var i = 0; i < arr.length; i++) { eventName = arr[i]; this.Outp(['send', 'event', eventName, ev1, ev2, ev3, ev4]); try { ga('send', 'event', eventName, ev1, ev2, ev3, ev4); if (window['_gatrall']) { $.each(_gatrall, function (i, it) { ga(it + '.send', 'event', eventName, ev1, ev2, ev3, ev4); }); } } catch (ex) { } } }
    , GTMTrackEvent: function (event, eventLabel) { var arr = [event]; try { if (window['promoTrackingPrefixes']) { arr = arr.concat(window['promoTrackingPrefixes']); for (var i = 1; i < arr.length; i++) { arr[i] += event; } } } catch (ex) { } for (var i = 0; i < arr.length; i++) { event = arr[i]; try { this.Outp("GTM: " + event + ", " + (eventLabel || '')); dataLayer.push(eventLabel ? { "event": event, "eventLabel": eventLabel } : { "event": event }); } catch (ex) { } } }

    , FindIdx: function (arr, func) { for (var i = 0; i < arr.length; i++) { if (func(arr[i])) return i; } return -1; }
    , Find: function (arr, func) { for (var i = 0; i < arr.length; i++) { if (func(arr[i])) return arr[i]; } return null; }
    , Filter: function (arr, func) { var newArr = []; for (var i = 0; i < arr.length; i++) { if (func(arr[i])) newArr.push(arr[i]); } return newArr; }
    , ForAll: function (arr, func) { for (var i = 0; i < arr.length; i++) { func(arr[i], i); } }
    , Last: function (arr) { return arr[arr.length - 1]; }
    , IsNumber: function (n) { return !isNaN(parseFloat(n)) && isFinite(n); }
    , GetNumber: function (s, def) { if (!this.IsNumber(s)) return def; return parseFloat(s); }
    , Outp: function (s) { try { console.log(s); } catch (ex) { } }
};

var _CommonHelper = _utility;
$(function () { _utility.Init(); });