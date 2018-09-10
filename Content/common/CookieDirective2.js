var _cookieDirective = {
    _defaultOptions: {
        disclosureText: '<div id="cookiesdirective" style="position:fixed;bottom:-300px;left:0px;width:100%;height:auto;background:#000000;opacity:.90; -ms-filter: alpha(opacity=90); filter: alpha(opacity=90);-khtml-opacity: .90; -moz-opacity: .90; color:#FFFFFF;font-family:arial;font-size:14px;text-align:center;z-index:1100;">'
	                    + '<div style="position:relative;height:auto;width:95%;padding:10px;margin-left:auto;margin-right:auto;padding-bottom:5px;">'
	                    + '<span id="epd_t1">We use cookies to ensure that we give you the best experience on our website. '
	                    + 'We also use cookies to ensure we show you advertising that is relevant to you. '
	                    + 'If you continue without changing your settings, we\'ll assume that you are happy to receive all cookies on the Invisalign website. '
	                    + 'However, if you would like to, you can change your </span><a id="epd_t2" style="color:#ca0000;font-weight:bold;font-family:arial;font-size:14px;" href="{0}">cookie settings</a><span id="epd_t3"> at any time.</span><br/><br/>'
                    	+ '<input type="button" name="epdsubmit" id="epdsubmit" value="Continue"/><br/><br/></div></div>'

        , showAnimationTime: 2000
        , hideAnimationTime: 2000
        , privacyPolicyUrl: '/en/Sub/Pages/ManageCookies.aspx'
        , langVersions: {
            'de': ["Wir verwenden Cookies, um Ihnen die bestmögliche Nutzung unserer Website zu ermöglichen. Außerdem blenden wir mithilfe von Cookies Werbung ein, die für Sie relevant ist. Wenn Sie ohne Änderung Ihrer Einstellungen fortfahren, gehen wir davon aus, dass Sie mit dem Setzen von Cookies durch die Invisalign-Website einverstanden sind. Bei Bedarf können Sie Ihre ", "Cookie-Einstellungen", " jederzeit ändern.", "Weiter"]
            , 'fr': ["Nous utilisons des cookies afin de vous assurer la meilleure expérience de notre site Internet, mais également pour être sûrs que les publicités affichées sur votre écran soient celles qui vous intéressent. Si vous continuez sans modifier vos paramètres, nous considérerons que recevoir les cookies du site Internet Invisalign vous convient parfaitement. Vous pouvez, néanmoins, modifier les ", "paramètres des cookies", " à tout moment, si vous le souhaitez.", "Continuer"]
            , 'es': ["Utilizamos cookies para poder garantizarle que le ofrecemos la mejor experiencia posible en nuestro sitio web. También utilizamos cookies para asegurarnos de que le mostramos publicidad que es relevante para usted. Si no cambia la configuración, entenderemos que está de acuerdo con recibir todas las cookies del sitio web de Invisalign. Sin embargo, si lo desea, puede cambiar esta ", "configuración de las cookies", " en cualquier momento.", "Continuar"]
            , 'it': ["Ci avvaliamo dei cookie per garantirvi la migliore esperienza di utilizzo del nostro sito web. Inoltre, intendiamo assicurarci di visualizzare solo la pubblicità che può interessarvi. Procedendo senza apportare modifiche alle impostazioni, si accetta di ricevere tutti i cookie del sito web Invisalign. Tuttavia, se lo si desidera, è possibile modificare le ", "impostazioni relative ai cookie", " in qualsiasi momento.", "Continuare"]
            , 'dk': ["Vi bruger cookies til at sikre, at vi giver dig den bedste oplevelse på vores websted. Vi bruger også cookies til at sikre, at vi viser dig reklamer, der er relevante for dig. Hvis du vil fortsætte uden at ændre dine indstillinger, forudsætter vi, at du gerne vil modtage alle cookies på Invisalign-webstedet. Men hvis du vil, kan du ændre ", "dine cookie-indstillinger", " når som helst.", "Fortsæt"]
            , 'se': ["Vi använder cookies för att säkerställa att du får bästa möjliga upplevelse av vår webbplats. Vi använder också cookies för att säkerställa att vi visar annonser som är relevanta för dig. Om du fortsätter utan att ändra dina inställningar antar vi att du är tillfreds med att ta emot alla cookies från Invisaligns webbplats. Du kan dock, om du så önskar, ändra ", "dina cookie-inställningar", " när som helst.", "Fortsätt"]
            , 'no': ["Vi bruker cookies (informasjonskapsler) for å gi deg mest mulig nytte av vårt nettsted. Vi bruker også  cookies for å vise deg reklame som er relevant for deg. Hvis du fortsetter uten å endre innstillingene dine, vil vi anse at du aksepterer å motta alle cookies på Invisalign-nettstedet. Du kan imidlertid endre ", "dine cookie-innstillinger", " når som helst.", "Fortsett"]
            , 'fi': ["Pyrimme evästeiden avulla varmistamaan, että kokemuksesi verkkosivustostamme on paras mahdollinen. Varmistamme evästeiden avulla myös, että näytämme sinun kannaltasi merkityksellisiä mainoksia. Jos jatkat muuttamatta asetuksiasi, oletamme, että hyväksyt kaikkien evästeiden vastaanottamisen Invisalign-verkkosivustolta. Halutessasi voit kuitenkin muuttaa ", "evästeasetuksiasi", " milloin tahansa.", "Jatka"]
            , 'is': ["Við notum kökur til að tryggja að þú fáir sem mest út úr vefsvæðinu okkar. Við notum einnig kökur til að tryggja að við birtum þér auglýsingar sem vekja áhuga þinn. Ef þú heldur áfram án þess að breyta stillingunum gerum við ráð fyrir að þú takir með glöðu geði við öllum kökum á vefsvæði Invisalign. Ef þú vilt geturðu breytt ", "kökustillingunum þínum", " hvenær sem óskað er.", "Halda áfram"]
            , 'pt': ["Utilizamos cookies para garantir que lhe proporcionamos a melhor experiência no nosso website. Também utilizamos cookies para garantir que lhe mostramos publicidade relevante para si. Se continuar sem alterar as suas definições, partimos do princípio que está satisfeito por receber cookies no website Invisalign. No entanto, se desejar, pode alterar ", "as suas definições de cookies", " em qualquer momento.", "Continuar"]
            , 'gr': ["Χρησιμοποιούμε cookie για να διασφαλίσουμε ότι σας παρέχουμε την καλύτερη εμπειρία κατά τη χρήση της διαδικτυακής μας τοποθεσίας. Επίσης, χρησιμοποιούμε cookie για να διασφαλίσουμε ότι σας παρέχουμε διαφημίσεις που σας ενδιαφέρουν. Αν συνεχίσετε χωρίς να αλλάξετε τις ρυθμίσεις σας, θεωρούμε ότι δέχεστε να λαμβάνετε όλα τα cookie που υπάρχουν στη διαδικτυακή τοποθεσία της Invisalign. Ωστόσο, αν θέλετε, μπορείτε να αλλάξετε ", "τις ρυθμίσεις σας για τα cookie", " οποιαδήποτε στιγμή.", "Συνέχεια"]
            , 'pl': ["Wykorzystujemy pliki cookie, aby umożliwić użytkownikowi jak najbardziej komfortowe korzystanie z naszej witryny. Używamy plików cookie także po to, aby wyświetlać treści reklamowe najbardziej odpowiadające twoim potrzebom. Jeśli będziesz kontynuować przeglądanie bez zmiany twoich ustawień, zakładamy, że zgadzasz się na otrzymywanie wszystkich plików cookie w witrynie Invisalign. Jednak jeśli chcesz, możesz zmienić ", "ustawienia plików cookie", " w dowolnym momencie.", "Dalej"]
            , 'cz': ["Používáme soubory cookie, abychom vám poskytli co nejlepší dojem z našeho webu. Soubory cookie používáme také k tomu, abychom vám zobrazovali pouze relevantní reklamu. Budete-li pokračovat beze změny nastavení, budeme předpokládat, že souhlasíte s použitím všech souborů cookie na webu Invisalign. Pokud však chcete, můžete nastavení ", "souborů cookie", " kdykoli změnit.", "Pokračovat"]
            , 'sk': ["Používame súbory „cookie“, aby sme vám vedeli poskytnúť tú najlepšiu skúsenosť na našej webovej lokalite. Súbory „cookie“ používame aj na to, aby sme vám dokázali zobraziť reklamu, ktorá vás môže zaujímať. Ak budete pokračovať bez toho, aby ste zmenili nastavenie, budeme predpokladať, že nemáte problém s prijímaním žiadneho súboru „cookie“ na webovej lokalite Invisalignu. Podľa potreby však môžete kedykoľvek ", "zmeniť nastavenie", " súborov „cookie“.", "Pokračovať"]
            , 'ro': ["Folosim module cookie pentru a ne asigura că vă oferim cea mai bună experienţă pe site-ul nostru web. De asemenea, folosim module cookie pentru a ne asigura că vă arătăm publicitatea relevantă pentru dumneavoastră. În cazul în care continuaţi fără a vă modifica setările, vom presupune că sunteţi de acord să primiţi toate modulele cookie de pe site-ul web Invisalign. Cu toate acestea, dacă doriţi, vă puteţi modifica ", "setările de module cookie", " în orice moment.", "Continuare"]
            , 'hu': ["Cookie-kat használunk annak érdekében, hogy a webhelyünkön a felhasználói élmény minél jobb legyen. A cookie-k használatával továbbá biztosíthatjuk, hogy az Ön számára fontos hirdetéseket jelenítjük meg Önnek. Ha a beállítások módosítása nélkül továbblép, azt feltételezzük, hogy az Invisalign webhelyen található összes cookie fogadását engedélyezi. Ha azonban szeretné, bármikor ", "módosíthatja", " a cookie-k beállításait.", "Tovább"]
            , 'nl': ["We gebruiken cookies om u op onze website een optimale gebruikerservaring te bieden. We gebruiken ook cookies om ervoor te zorgen dat onze reclamematerialen relevant zijn voor u. Wilt u verdergaan zonder uw instellingen te wijzigen, dan nemen we aan dat u ermee instemt alle cookies op de website van Invisalign te ontvangen. U kunt er echter ook voor kiezen uw ", "cookie-instellingen", " op elk gewenst moment te wijzigen", "Verder"]
            , 'bg': ["Ние използваме „бисквитки“, за да гарантираме, че Ви осигуряваме най-добро използване на нашия уебсайт. Освен това използваме „бисквитки“, за да сме сигурни, че Ви показваме реклами, които са подходящи за Вас. Ако продължите, без да променяте настройките си, ще приемем, че не възразявате да получавате всички „бисквитки“ на уебсайта на Invisalign. Но, ако желаете, можете да промените, ", "настройките за „бисквитките“ ", " по всяко време.", "Продължение"]
            , 'hr': ["Koristimo se kolačićima kako bismo vam osigurali najbolje iskustvo na našem web-mjestu. Također, koristimo se kolačićima kako bismo bili sigurni da ćemo prikazati oglase koji vama odgovaraju. Ako nastavite bez promjene postavki, pretpostavit ćemo da svojevoljno prihvaćate sve kolačiće na web-mjestu Invisalign. No ako želite, možete u bilo kojem trenutku ", "promijeniti", " postavke kolačića.", "Nastavi"]
            , 'si': ["Piškotke uporabljamo, da vam zagotovimo najboljšo izkušnjo na našem spletnem mestu. Piškotke uporabljamo tudi, da vam zagotovimo prikaz oglasov, ki so najbolj ustrezni za vas. Če nadaljujete, ne da bi spremenili nastavitve, bomo sklepali, da se strinjate s sprejemom vseh piškotkov na spletnem mestu Invisalign. Če želite, lahko nastavitve ", "piškotkov kadarkoli", " spremenite.", "Nadaljuj"]
            , 'ru': ["Данный веб-сайт использует cookies для анализа использования, управления навигацией и другими функциями веб-сайта. Мы ни с кем не делимся этой информацией. Отказавшись от использования cookies, Вы не сможете использовать данный веб-сайт. Для того, чтобы узнать больше об использовании cookies на данном веб-сайте, прочтите ", "Соглашение о неразглашении", " и использовании cookies. Используя данный веб-сайт, Вы соглашаетесь с тем, что мы сохраняем и используем cookies на Вашем устройстве для улучшения пользования данным сайтом.", "Утвердить"]
            , 'et': ["See veebisait kasutab küpsiseid, et parandada  teie külastuskogemust. Küpsiseid kasutatakse veebisaidi kasutamise analüüsimiseks, navigatsiooni haldamiseks ning muude funktsioonide jaoks. Me ei jaga infot kolmandate osapooltega. Te võite küpsiste lubamisest keelduda, kuid sellisel juhul ei saa te seda veebisaiti kasutada.Täiendava info saamiseks antud veebisaidil kasutatavate küpsiste kohta tutvuge meie ", "privaatsusavaldusega", " millest leiate ka info küpsiste kasutamise kohta. Antud veebisaiti kasutades nõustute sellega, et võime teie seadmesse küpsiseid salvestada ja nendele ligipääsu omada eesmärgiga pakkuda teile paremat teenust.", "Nõustun"]
            , 'lv': [" Jūsu pieredes uzlabošanai šajā mājaslapā tiek izmantotas sīkdatnes. Sīkdatnes tiek izmantotas, lai analizētu kā tiek izmantota mājaslapa, lai organizētu navigāciju un citas funkcijas. Nekāda informācija netiek izpausta. No sīkdatnēm iespējams izvairīties, taču tad nav iespējams izmantot mājaslapu. Lai uzzinātu vairāk par sīkdatnēm, kas izmantotas šajā mājaslapā, lasiet mūsu ", "Privātuma protokolu", " un tajā esošo informāciju par sīkdatnēm. Izmantojot šo mājaslapu Jūs piekrītat, ka pieredzes uzlabošanai mēs uzkrāsim un izmantosim sīkdatnes uz Jūsu ierīces.", "Piekrītu"]
            , 'lt': ["Šioje interneto svetainėje slapukai naudojami jūsų naršymo patirčiai pagerinti. Slapukai yra naudojami šios interneto svetainės naudojimo analizei, navigacijos ir kitų funkcijų valdymui. Mes nesidaliname jokia informacija. Galite atsisakyti dalintis slapukais, bet negalėsite naudotis šia interneto svetaine. Norėdami daugiau sužinoti apie šioje svetainėje naudojamus slapukus, perskaitykite ", "mūsų Pareiškimą apie privatumo apsaugą", " ir jame esantį slapukų naudojimo aprašymą.Naudodamiesi šia svetaine jūs neprieštaraujate tam, kad siekdami pagerinti jūsų naršymo patirtį mes laikytume ir prieitume prie slapukų, esančių jūsų kompiuteryje.", "Sutinku"]
            , 'uk': ["Даний веб-сайт використовує cookies для поліпшення його використання. Cookies використовується для аналізу використання веб-сайту, управління навігацією та іншими функціями. Ми не ділимося ні з ким цією інформацією. Ви можете відмовитися від використання cookies, але тоді ми ви не зможете використовувати даний веб-сайт. Для того, щоб дізнатися більше про використання cookies на цьому веб-сайті, ", "прочитайте Угода про нерозголошення і використанні cookies.", " Використовуючи даний веб-сайт ви погоджуєтеся з тим, що ми можемо зберігати і використовувати cookies на вашому пристрої для поліпшення користування даним сайтом.", "затвердити"]
            , 'tr': ["Bu internet sitesi, deneyiminizi geliştirmek için, internet çerezleri (cookies) kullanmaktadır. İnternet çerezleri (cookies), bu internet sitesinin kullanımını incelemede, navigasyonu yönlendirmede ve diğer fonksyonlarda kullanılmaktadır. Bilgiler başkalarıyla paylaşılmamaktadır. İnternet çerezlerini paylaşmayı tercih etmeyebilirsiniz ancak bu durumda bu internet sitesini kullanamayacaksınız. Bu sitede kullanılan internet çerezleri hakkında daha fazla bilgi sahibi olmak için, ", "Gizlilik Politikamızı", " ve içindeki internet çerezleri kullanımını okuyunuz. Bu sitenin kullanımıyla, deneyiminizin gelişimi için, bilgisayarınıza internet çerezlerini (cookies) kaydedebileceğimizi ve bunlara erişebileceğimizi kabul etmiş olursunuz.", "Kabul Ediyorum"]
            , 'ar': ["الموقع الإلكتروني يستخدم الكوكيز (ملفات تعريف الارتباط) لتحسين التواصل. تستخدم الكوكيز لتحليل استخدام هذا الموقع الإلكتروني و إدارة التواصل الاكتروني و سواه و لا تستعمل معلوماتك لأي هدف . <br><br>يمكنك الانسحاب من مشاركة الكوكيز ولكن لن يمكنك استخدام الموقع الإلكتروني.<br>لتتعلم أكثر حول الكوكيز المستخدمة في هذا الموقع، قم بقراءة ", "بيان الخصوصية الخاص بنا", " واستخدام الكوكيز داخله.<br>باستخدام هذا الموقع، فأنت توافق بأنة يمكننا تخزين والدخول على الكوكيز في جهازك من أجل تحسين التواصل.", "القبول"]
            , 'he': ["האתר משתמש בקובצי cookie כדי לשפר את החוויה שלך. קובצי ה-‏ cookie משמשים לשם ניתוח השימוש שלך באתר זה, ניהול הניווט ופונקציות נוספות. איננו משתפים את הפרטים.<br><br>תוכל לבטל את הסכמתך לשיתוף קובצי cookie, אך אם תעשה זאת לא תוכל להשתמש באתר<br>למידע נוסף על קובצי cookie המשמשים באתר זה, עיין ", "בהצהרת הפרטיות", " שלנו ובפירוט השימוש בקובצי cookie שמופיע בהצהרה.", "מסכים"]

        }
        , resourceLanguage: 'en'
    }
    , _options: {}
    , _cookieName: 'cookiesDirective'
    , _shouldShowPopup: false

    , init: function (){
        if (!this.checkCookiesEnabled() || this.checkAccepted()) return;

        this._shouldShowPopup = true;
        this.setCookieAccepted();
    }

    , checkShow: function(options) {

        this._options = $.extend({}, this._defaultOptions, options);
        if (!this.checkCookiesEnabled() || !this._shouldShowPopup) return;

        var disclosureText = this._options.disclosureText.replace ('{0}', this._options.privacyPolicyUrl);
        $('body').append(disclosureText);
        
        if (this._options.resourceLanguage && this._options.langVersions[this._options.resourceLanguage]){
            var langRes = this._options.langVersions[this._options.resourceLanguage];
            $('#epd_t1').html(langRes[0]);
            $('#epd_t2').html(langRes[1]);
            $('#epd_t3').html(langRes[2]);
            $('#epdsubmit').val(langRes[3]);
        }

        var p = this;
        $('#epdsubmit').click (function () {
            p.animatePopup(false, function(){ });
        });

        this.animatePopup(true);
    }
    
    , animatePopup: function (show, callback) {
        
        if (show){
            $('#cookiesdirective').animate({bottom:'0'}, this._options.showAnimationTime, function() {
                if (callback) callback();
            });
        }
        else {
            $('#cookiesdirective').animate({opacity: 0, bottom: -300}, this._options.hideAnimationTime, function() {
                if (callback) callback();
            });
        }
    }

    , checkUseScript: function (checkCategory) {
        /*local*/
        var data = this.getCookieData();
        var canUse = true;
        if (!this.isNumber(checkCategory)) {
            for (var i = 0; i < data.allowCategory.length; i++){
                canUse = canUse && data.allowCategory[i];
            }
        }
        else {
            canUse = data.allowCategory[checkCategory] ? true : false;
        }

        return canUse || !this.checkCookiesEnabled();
    }

    , mangeRadioButtonSettings: function (){
        var data = this.getCookieData(), p = this;
        data.accepted = true;
        
        var getId = function (idx, on) { return 'cat' + idx + (on ? 'on' : 'off') };

        var changeHandler = function () {
            for (var i = 1; i < data.allowCategory.length; i++){
                data.allowCategory[i] = $('#' + getId(i, true)).prop('checked') ? true : false;
            }
            p.setCookieData(data);
        };

        for (var i = 1; i < data.allowCategory.length; i++){
            var cat = data.allowCategory[i];
            $('#' + getId(i, cat)).prop('checked', true);

            var ids = '#' + getId(i, true) + ',#' + getId(i, false);
            $(ids).change(changeHandler);
        }
    }

    , checkAccepted: function () {
        var data = this.getCookieData();
        return data.accepted;
    }
    
    , setCookieAccepted: function (allowCategory) {
        var data = this.getDefaultCookieData();
        data.accepted = true;
        if (allowCategory && allowCategory.length && allowCategory.length) {
            for (var i = 0; i < allowCategory.length; i++){
                data.allowCategory[i] = allowCategory[i];
            }
        }

        this.setCookieData(data);
    }

    , getCookieData: function () {
        var data = this.getDefaultCookieData();
        var cookie = this.cdReadCookie(this._cookieName);
        if (!cookie) return data;

        dataItems = cookie.split('|');
        if (dataItems[0] == 'accepted') { data.accepted = true; }
        for (var i = 1; i < dataItems.length; i++){
            var num = dataItems[i];
            if (this.isNumber (num)) {
                num = parseInt(num);
                if (num > 0 && num < data.allowCategory.length) {
                    data.allowCategory[num] = false;
                }
            }
        }

        return data;
    }
    
    , setCookieData: function (data) {
        var arr = ['accepted'];
        for (var i = 1; i < data.allowCategory.length; i++) {
            if (data.allowCategory[i] === false) {
                arr.push ('' + i);
            }
        }
        var s = arr.join('|');
        this.cdCreateCookie (this._cookieName, s, 365 * 2);
    }
    
    , getDefaultCookieData: function() {
        return { accepted: false, allowCategory: [true, true, true, true] };
    }

    , checkCookiesEnabled: function () {
        return window.navigator.cookieEnabled !== false;
    }
    
    , isNumber: function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    , cdReadCookie: function(name) {
	
	    var nameEQ = name + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0;i < ca.length;i++) {
		    var c = ca[i];
		    while (c.charAt(0)==' ') c = c.substring(1,c.length);
		    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	    }
    	
	    return null;
    	
    }

    , cdCreateCookie: function (name,value,days) {
    	
	    if (days) {
		    var date = new Date();
		    date.setTime(date.getTime()+(days*24*60*60*1000));
		    var expires = "; expires="+date.toGMTString();
	    }
	    else var expires = "";
	    document.cookie = name+"="+value+expires+"; path=/";
    }
};

_cookieDirective.init();