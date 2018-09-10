var _dlCountryData = {
    "countries": {
        "gb": {
            label: "United Kingdom"
            , searchName: "UK"
            , code: "GB"
            , countryList: "gb"
            , locales: ["en-gb", "en"]
            , distUnit: "mi"
            , zipRegex: "^[A-Z]{1,2}[0-9R][0-9A-Z]?[ ]?[0-9][ABD-HJLNP-UW-Z]{2}$"
            , sampleZip: "CB2 9NH"
            , addressPattern: "{SA}, {CT} {PC}, {CY}"
            , countryRestriction: "^(gb|uk|im|gg|je)$"
            , manualPCRadius: { "hull": [16], "derby": [17], "brighton": [14], "yorkshire": [65], "sheffield": [16], "peterborough": [15], "leeds": [11], "bournemouth": [35], "ne5 1sr": [1.6], "ne51sr": [1.6] }
			, manualPostalCodes: { "yorkshire": [53.707943, -0.979923, "GB"], "leeds": [53.798322, -1.544915, "GB"], "cb3": [52.211062, 0.096242, "GB"] }
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "ie": {
            label: "Ireland"
            , searchName: "Ireland"
            , code: "IE"
            , countryList: "ie,gb"
            , locales: ["en-ie"]
            , distUnit: "km"
            , zipRegex: null
            , sampleZip: ""
            , addressPattern: "{SA}, {CT} {PC}, {CY}"
            , disablePostalCode: true
            , countryRestriction: "^(ie|gb|uk)$"
            , manualPostalCodes: { "londonderry": [55.000992, -7.306152, "GB"] }
            , defaultPCRadius: 1.5
            , defaultCityRadius: 28
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "ni": {
            label: "Northern Ireland"
            , searchName: "Northern Ireland, United Kingdom"
            , code: "NI"
            , countryList: "ie,gb"
            , locales: ["en-gb"]
            , distUnit: "mi"
            , zipRegex: "^[A-Z]{1,2}[0-9R][0-9A-Z]?[ ]?[0-9][ABD-HJLNP-UW-Z]{2}$"
            , sampleZip: "BT1 4QG"
            , addressPattern: "{SA}, {CT} {PC}, {CY}"
            , disablePostalCode: false
            , countryRestriction: "^(ie|gb|uk)$"
            , manualPostalCodes: { "londonderry": [55.000992, -7.306152, "GB"] }
            , defaultPCRadius: 1.5
            , defaultCityRadius: 28
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "at": {
            label: "Österreich"
            , searchName: "Österreich"
            , code: "AT"
            , countryList: "at"
            , locales: ["de-at"]
            , distUnit: "km"
            , zipRegex: "^\\d{4}$"
            , sampleZip: "1030"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^at$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "de": {
            label: "Deutschland"
            , searchName: "Deutschland"
            , code: "DE"
            , countryList: "de"
            , locales: ["de-de", "de"]
            , distUnit: "km"
            , zipRegex: "^\\d{5}$"
            , sampleZip: "20354"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^de$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
			, manualPostalCodes: { "85221": [48.2582001, 11.452981] }
            , manualPCRadius: { "dortmund": [22], "berlin": [24], "stuttgart": [14], "leonberg": [13], "70173": [13.5], "70174": [14.5], "70176": [15], "70178": [14.5], "esslingen": [11] }
        }
        , "ch": {
            label: "Schweiz"
            , searchName: "Schweiz"
            , code: "CH"
            , countryList: "ch"
            , locales: ["de-ch", "fr-ch", "it-ch"]
            , distUnit: "km"
            , zipRegex: "^\\d{4}$"
            , sampleZip: "3012"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^ch$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
            , manualPostalCodes: { "4000": [47.55961, 7.58061], "4001": [47.55699, 7.58876], "4002": [47.55961, 7.58061], "4003": [47.55961, 7.58061], "4004": [47.55961, 7.58061], "4005": [47.55961, 7.58061], "4007": [47.55961, 7.58061], "4008": [47.55961, 7.58061], "4009": [47.55961, 7.58061], "4010": [47.55961, 7.58061], "4011": [47.55961, 7.58061], "4012": [47.55961, 7.58061], "4013": [47.55961, 7.58061], "4015": [47.55961, 7.58061], "4016": [47.55961, 7.58061], "4017": [47.55961, 7.58061], "4018": [47.55961, 7.58061], "4019": [47.55961, 7.58061], "4020": [47.55961, 7.58061], "4023": [47.55961, 7.58061], "4024": [47.55961, 7.58061], "4025": [47.55961, 7.58061], "4030": [47.55961, 7.58061], "4031": [47.56195, 7.5833], "4032": [47.55961, 7.58061], "4033": [47.55961, 7.58061], "4034": [47.55961, 7.58061], "4035": [47.55961, 7.58061], "4039": [47.55961, 7.58061], "4040": [47.55961, 7.58061], "4041": [47.55961, 7.58061], "4042": [47.55961, 7.58061], "4051": [47.55833, 7.58616], "4052": [47.54548, 7.60591], "4053": [47.53787, 7.59713], "4054": [47.55051, 7.57131], "4055": [47.56341, 7.56785], "4056": [47.56799, 7.57258], "4057": [47.57609, 7.60121], "4058": [47.56737, 7.61149], "4059": [47.52965, 7.59342], "4065": [47.55961, 7.58061], "4070": [47.55961, 7.58061], "4075": [47.55961, 7.58061], "4078": [47.55961, 7.58061], "4080": [47.55961, 7.58061], "4081": [47.55961, 7.58061], "4082": [47.55961, 7.58061], "4083": [47.55961, 7.58061], "4084": [47.55961, 7.58061], "4085": [47.55961, 7.58061], "4086": [47.55961, 7.58061], "4087": [47.55961, 7.58061], "4088": [47.55961, 7.58061], "4089": [47.55961, 7.58061], "4091": [47.55961, 7.58061], "4092": [47.55961, 7.58061], "4093": [47.55961, 7.58061], "4094": [47.55961, 7.58061], "4095": [47.55961, 7.58061], "4096": [47.55961, 7.58061], "3000": [46.94802, 7.44821], "3001": [46.94802, 7.44821], "3002": [46.94802, 7.44821], "3003": [46.94688, 7.44405], "3004": [46.97379, 7.44151], "3005": [46.93998, 7.44864], "3006": [46.94522, 7.46987], "3007": [46.93861, 7.43985], "3008": [46.94363, 7.41822], "3010": [46.94719, 7.42337], "3011": [46.94752, 7.44601], "3012": [46.95714, 7.43158], "3013": [46.95605, 7.4553], "3014": [46.9629, 7.4596], "3015": [46.93957, 7.48076], "3017": [46.94802, 7.44821], "3018": [46.93984, 7.37155], "3019": [46.93132, 7.33792], "3020": [46.93819, 7.32751], "3024": [46.94802, 7.44821], "3027": [46.95218, 7.36781], "3029": [46.948, 7.44815], "3030": [46.94802, 7.44821], "3039": [46.94802, 7.44821], "3040": [46.94802, 7.44821], "3041": [46.94802, 7.44821], "3050": [46.94802, 7.44821] }
            , manualPCRadius: { "8000": [10], "8004": [2] }
        }

        , "it": {
            label: "Italia"
            , searchName: "Italy"
            , code: "IT"
            , countryList: "it"
            , locales: ["it-it", "it"]
            , distUnit: "km"
            , zipRegex: "^\\d{5}$"
            , sampleZip: "10015"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^it$"
            , manualPCRadius: { "24040": [10], "21052": [5], "22100": [10], "mogliano veneto": [13], "mogliano": [13], "montebelluna": [16], "cinisello": [4], "avellino": [18.9] }
            , manualPostalCodes: { "40100": [44.494852, 11.342998], "00100": [41.902551, 12.496146], "20100": [45.465639, 9.186931], "90140": [38.133814, 13.33266], "benevento": [41.119829, 14.795907], "naples": [40.840318, 14.250400], "napoli": [40.840318, 14.250400], "80100": [40.840318, 14.250400] }
            , defaultPCRadius: 3
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }
        , "es": {
            label: "Spain"
            , searchName: "Spain"
            , code: "ES"
            , countryList: "es"
            , locales: ["es-es", "es"]
            , distUnit: "km"
            , zipRegex: "^\\d{5}$"
            , sampleZip: "28052"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^es$"
            , manualPCRadius: { "canarias": [150], "14001": [5], "tenerife": [45] }
			, manualPostalCodes: { "alicante": [38.3459963, -0.4906855] }
            , defaultPCRadius: 4
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        	, "dk": {
        	    label: "Denmark"
            , searchName: "Denmark"
            , code: "DK"
            , countryList: "dk"
            , locales: ["dk-sk"]
            , distUnit: "km"
            , zipRegex: "^\\d{4}$"
            , sampleZip: "2700"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^dk$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        	}

		, "se": {
		    label: "Sweden"
            , searchName: "Sweden"
            , code: "SE"
            , countryList: "se"
            , locales: ["se-se"]
            , distUnit: "km"
            , zipRegex: "^\\d{5}$"
            , sampleZip: "11157"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^se$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
		}

		, "no": {
		    label: "Norway"
            , searchName: "Norway"
            , code: "NO"
            , countryList: "no"
            , locales: ["no-no"]
            , distUnit: "km"
            , zipRegex: "^\\d{4}$"
            , sampleZip: "0188"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^no$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
		}

		, "fi": {
		    label: "Finland"
            , searchName: "Finland"
            , code: "FI"
            , countryList: "fi"
            , locales: ["fi-fi"]
            , distUnit: "km"
            , zipRegex: "^\\d{5}$"
            , sampleZip: "01300"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^fi$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
		}

		, "gr": {
		    label: "Greece"
            , searchName: "Greece"
            , code: "GR"
            , countryList: "gr"
            , locales: ["gr-gr"]
            , distUnit: "km"
            , zipRegex: "^\\d{5}$"
            , sampleZip: "57013"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^gr$"
            , manualPCRadius: { "larissa": [20], "λάρισα": [20], "θεσσαλονίκη": [15], "thessaloniki": [15], "drama": [120], "δράμα": [120], "greece": [200], "ellada": [200], "ελλάδα": [200] }
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 20
            , defaultCityRadiusIncrement: 20
		}

		, "pt": {
		    label: "Portugal"
            , searchName: "Portugal"
            , code: "PT"
            , countryList: "pt"
            , locales: ["pt-pt"]
            , distUnit: "km"
            , zipRegex: "^\\d{4}-\\d{3}$"
            , sampleZip: "4590-507"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^pt$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
		}

        , "ad": {
            label: "Andorra"
            , searchName: "Andorra"
            , code: "AD"
            , countryList: "ad,es"
            , locales: ["ca-ad"]
            , distUnit: "km"
            , zipRegex: "^ad[1-7]00$"
            , sampleZip: "AD500"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^ad$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "sm": {
            label: "San Marino"
            , searchName: "San Marino"
            , code: "SM"
            , countryList: "sm,it"
            , locales: ["it-sm"]
            , distUnit: "km"
            , zipRegex: "^4789[0-9]$"
            , sampleZip: "47891"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^sm$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "gi": {
            label: "Gibraltar"
            , searchName: "Gibraltar"
            , code: "GI"
            , countryList: "gi,es"
            , locales: ["en-gi"]
            , distUnit: "km"
            , zipRegex: "^GX11 1AA$"
            , sampleZip: "GX11 1AA"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^gi$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "is": {
            label: "Iceland"
            , searchName: "Iceland"
            , code: "IS"
            , countryList: "is"
            , locales: ["is-is"]
            , distUnit: "km"
            , zipRegex: "^[1-9]\\d\\d$"
            , sampleZip: "101"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^is$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "gl": {
            label: "Greenland"
            , searchName: "Greenland"
            , code: "GL"
            , countryList: "gl"
            , locales: ["kl-gl"]
            , distUnit: "km"
            , zipRegex: "^39\\d\\d$"
            , sampleZip: "3905"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^gl$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "mt": {
            label: "Malta"
            , searchName: "Malta"
            , code: "MT"
            , countryList: "mt"
            , locales: ["mt-mt"]
            , distUnit: "km"
            , zipRegex: "^[A-Z]{3} ?\\d{4}$"
            , sampleZip: "VLT 1117"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^mt$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "li": {
            label: "Liechtenstein"
            , searchName: "Liechtenstein"
            , code: "LI"
            , countryList: "li"
            , locales: ["de-li"]
            , distUnit: "km"
            , zipRegex: "^\\d{4}$"
            , sampleZip: "9485"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^li$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "cz": {
            label: "Czech Republic"
            , searchName: "Czech Republic"
            , code: "CZ"
            , countryList: "cz"
            , locales: ["cz-cz"]
            , distUnit: "km"
            , zipRegex: "^\\d{3} ?\\d{2}$"
            , sampleZip: "159 00"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^cz$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "hu": {
            label: "Hungary"
            , searchName: "Hungary"
            , code: "HU"
            , countryList: "hu"
            , locales: ["hu-hu"]
            , distUnit: "km"
            , zipRegex: "^\\d{4}$"
            , sampleZip: "1012"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^hu$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }
        
        , "pl": {
            label: "Poland"
            , searchName: "Poland"
            , code: "PL"
            , countryList: "pl"
            , locales: ["pl-pl"]
            , distUnit: "km"
            , zipRegex: "^\\d{2}\\-?\\d{3}$"
            , sampleZip: "05-118"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^pl$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "ro": {
            label: "Romania"
            , searchName: "Romania"
            , code: "RO"
            , countryList: "ro"
            , locales: ["ro-ro"]
            , distUnit: "km"
            , zipRegex: "^\\d{6}$"
            , sampleZip: "021586"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^ro$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "sk": {
            label: "Slovakia"
            , searchName: "Slovakia"
            , code: "SK"
            , countryList: "sk"
            , locales: ["sk-sk"]
            , distUnit: "km"
            , zipRegex: "^\\d{3} ?\\d{2}$"
            , sampleZip: "811 02"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^sk$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "hr": {
            label: "Croatia"
            , searchName: "Croatia"
            , code: "HR"
            , countryList: "hr"
            , locales: ["hr-hr"]
            , distUnit: "km"
            , zipRegex: "^\\d{5}$"
            , sampleZip: "10010"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^hr$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "si": {
            label: "Slovenia"
            , searchName: "Slovenia"
            , code: "SI"
            , countryList: "si"
            , locales: ["sl-si"]
            , distUnit: "km"
            , zipRegex: "^\\d{4}$"
            , sampleZip: "1000"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^si$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "bg": {
            label: "Bulgaria"
            , searchName: "Bulgaria"
            , code: "BG"
            , countryList: "bg"
            , locales: ["bg-bg"]
            , distUnit: "km"
            , zipRegex: "^\\d{4}$"
            , sampleZip: "1000"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^bg$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "gh": {
            label: "Ghana"
            , searchName: "Ghana"
            , code: "GH"
            , countryList: "gh"
            , locales: ["ee-gh"]
            , distUnit: "km"
            , zipRegex: null
            , sampleZip: ""
            , addressPattern: "{SA}, {CT} {PC}, {CY}"
            , disablePostalCode: true
            , countryRestriction: "^gh$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "rs": {
            label: "Serbia"
            , searchName: "Serbia"
            , code: "RS"
            , countryList: "rs"
            , locales: ["sr-rs"]
            , distUnit: "km"
            , zipRegex: "^\\d{5}$"
            , sampleZip: "11000"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^rs$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "fo": {
            label: "Faroe Islands"
            , searchName: "Faroe Islands"
            , code: "FO"
            , countryList: "fo"
            , locales: ["fo-fo"]
            , distUnit: "km"
            , zipRegex: "^\\d{3}$"
            , sampleZip: "100"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^fo$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "nl": {
            label: "Netherlands"
            , searchName: "Netherlands"
            , code: "NL"
            , countryList: "nl"
            , locales: ["nl-nl"]
            , distUnit: "km"
            , zipRegex: "^\\d{4} ?\\w{2}$"
            , sampleZip: "1187 DB"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^nl$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "be": {
            label: "Belgium"
            , searchName: "Belgium"
            , code: "BE"
            , countryList: "be"
            , locales: ["nl-be"]
            , distUnit: "km"
            , zipRegex: "^\\d{4}$"
            , sampleZip: "1007"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^be$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "lu": {
            label: "Luxembourg"
            , searchName: "Luxembourg"
            , code: "LU"
            , countryList: "lu"
            , locales: ["de-lu"]
            , distUnit: "km"
            , zipRegex: "^\\d{4}$"
            , sampleZip: "1234"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^lu$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "am": {
            label: "Armenia"
            , searchName: "Armenia"
            , code: "AM"
            , countryList: "am"
            , locales: ["am-am"]
            , distUnit: "km"
            , zipRegex: "^\\d{4}$"
            , sampleZip: "0010"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^am$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "az": {
            label: "Azerbaijan"
            , searchName: "Azerbaijan"
            , code: "AZ"
            , countryList: "az"
            , locales: ["az-az"]
            , distUnit: "km"
            , zipRegex: "^\\d{4}$"
            , sampleZip: "1000"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^az$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "ge": {
            label: "Georgia"
            , searchName: "Georgia"
            , code: "GE"
            , countryList: "ge"
            , locales: ["ge-ge"]
            , distUnit: "km"
            , zipRegex: "^\\d{4}$"
            , sampleZip: "0105"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^ge$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "kg": {
            label: "Kyrgyzstan"
            , searchName: "Kyrgyzstan"
            , code: "KG"
            , countryList: "kg"
            , locales: ["kg-kg"]
            , distUnit: "km"
            , zipRegex: "^\\d{6}$"
            , sampleZip: "720000"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^kg$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "ru": {
            label: "Russia"
            , searchName: "Russia"
            , code: "RU"
            , countryList: "ru"
            , locales: ["ru-ru"]
            , distUnit: "km"
            , zipRegex: "^\\d{6}$"
            , sampleZip: "117105"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^ru$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "tj": {
            label: "Tajikistan"
            , searchName: "Tajikistan"
            , code: "TJ"
            , countryList: "tj"
            , locales: ["tj-tj"]
            , distUnit: "km"
            , zipRegex: "^\\d{6}$"
            , sampleZip: "735450"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^tj$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "tm": {
            label: "Turkmenistan"
            , searchName: "Turkmenistan"
            , code: "TM"
            , countryList: "tm"
            , locales: ["tm-tm"]
            , distUnit: "km"
            , zipRegex: "^\\d{6}$"
            , sampleZip: "744001"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^tm$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "uz": {
            label: "Uzbekistan"
            , searchName: "Uzbekistan"
            , code: "UZ"
            , countryList: "uz"
            , locales: ["uz-uz"]
            , distUnit: "km"
            , zipRegex: "^\\d{6}$"
            , sampleZip: "200100"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^uz$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "md": {
            label: "Moldova"
            , searchName: "Moldova"
            , code: "MD"
            , countryList: "md"
            , locales: ["md-md"]
            , distUnit: "km"
            , zipRegex: "^MD-\\d{4}$"
            , sampleZip: "MD-2001"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^md$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "cy": {
            label: "Cyprus"
            , searchName: "Cyprus"
            , code: "CY"
            , countryList: "cy"
            , locales: ["el-cy"]
            , distUnit: "km"
            , zipRegex: "^\\d{4}$"
            , sampleZip: "1000"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^cy$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 70
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "ee": {
            label: "Estonia"
            , searchName: "Estonia"
            , code: "EE"
            , countryList: "ee"
            , locales: ["et-ee"]
            , distUnit: "km"
            , zipRegex: "^\\d{5}$"
            , sampleZip: "69501"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^ee$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "kz": {
            label: "Kazakhstan"
            , searchName: "Kazakhstan"
            , code: "KZ"
            , countryList: "kz"
            , locales: ["kk-kz"]
            , distUnit: "km"
            , zipRegex: "^\\d{6}$"
            , sampleZip: "050016"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^kz$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "lv": {
            label: "Latvia"
            , searchName: "Latvia"
            , code: "LV"
            , countryList: "lv"
            , locales: ["lv-lv"]
            , distUnit: "km"
            , zipRegex: "^LV-\\d{4}$"
            , sampleZip: "LV-1001"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^lv$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "lt": {
            label: "Lithuania"
            , searchName: "Lithuania"
            , code: "LT"
            , countryList: "lt"
            , locales: ["lt-lt"]
            , distUnit: "km"
            , zipRegex: "^LT-\\d{5}$"
            , sampleZip: "LT-00120"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^lt$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "mc": {
            label: "Monaco"
            , searchName: "Monaco"
            , code: "MC"
            , countryList: "mc"
            , locales: ["fr-mc"]
            , distUnit: "km"
            , zipRegex: "^\\d{5}$"
            , sampleZip: "98000"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^mc$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "ua": {
            label: "Ukraine"
            , searchName: "Ukraine"
            , code: "UA"
            , countryList: "ua"
            , locales: ["uk-ua"]
            , distUnit: "km"
            , zipRegex: "^\\d{5}$"
            , sampleZip: "65000"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^ua$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "bh": {
            label: "Bahrain"
            , searchName: "Bahrain"
            , code: "BH"
            , countryList: "bh"
            , locales: ["ar-bh"]
            , distUnit: "km"
            , zipRegex: "^\\d\\d\\d\\d?$"
            , sampleZip: "101"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^bh$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "kw": {
            label: "Kuwait"
            , searchName: "Kuwait"
            , code: "KW"
            , countryList: "kw"
            , locales: ["ar-kw"]
            , distUnit: "km"
            , zipRegex: "^\\d{5}$"
            , sampleZip: "72251"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^kw$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "qa": {
            label: "Qatar"
            , searchName: "Qatar"
            , code: "QA"
            , countryList: "qa"
            , locales: ["ar-qa"]
            , distUnit: "km"
            , zipRegex: ""
            , sampleZip: ""
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^qa$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "sa": {
            label: "Saudi Arabia"
            , searchName: "Saudi Arabia"
            , code: "SA"
            , countryList: "sa"
            , locales: ["ar-sa"]
            , distUnit: "km"
            , zipRegex: "^\\d{5}$"
            , sampleZip: "11564"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^sa$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
            , manualPostalCodes: { "ksar1": [24.71, 46.67], "ksar2": [21.5, 39.2], "ksar3": [26.41, 50.1] }
            , hidePostalCode: true
        }

        , "ae": {
            label: "United Arab Emirates"
            , searchName: "United Arab Emirates"
            , code: "AE"
            , countryList: "ae"
            , locales: ["ar-ae"]
            , distUnit: "km"
            , zipRegex: ""
            , sampleZip: ""
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^ae$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
            , manualPCRadius: { "sharjah": [7] }
        }

        , "ma": {
            label: "Morocco"
            , searchName: "Morocco"
            , code: "MA"
            , countryList: "ma"
            , locales: ["ar-ma"]
            , distUnit: "km"
            , zipRegex: "^\\d{5}$"
            , sampleZip: "20452"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^ma$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "sn": {
            label: "Senegal"
            , searchName: "Senegal"
            , code: "SN"
            , countryList: "sn"
            , locales: ["fr-sn"]
            , distUnit: "km"
            , zipRegex: "^\\d{5}$"
            , sampleZip: "12500"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^sn$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "tn": {
            label: "Tunisia"
            , searchName: "Tunisia"
            , code: "TN"
            , countryList: "tn"
            , locales: ["ar-tn"]
            , distUnit: "km"
            , zipRegex: "^\\d{4}$"
            , sampleZip: "2085"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^tn$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "il": {
            label: "Israel"
            , searchName: "Israel"
            , code: "IL"
            , countryList: "il"
            , locales: ["he-il"]
            , distUnit: "km"
            , zipRegex: ""
            , sampleZip: ""
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^il$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "lb": {
            label: "Lebanon"
            , searchName: "Lebanon"
            , code: "LB"
            , countryList: "lb"
            , locales: ["ar-lb"]
            , distUnit: "km"
            , zipRegex: "^\\d{4}$"
            , sampleZip: "2038"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^lb$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "za": {
            label: "South Africa"
            , searchName: "South Africa"
            , code: "ZA"
            , countryList: "za"
            , locales: ["en-za"]
            , distUnit: "km"
            , zipRegex: "^\\d{4}$"
            , sampleZip: "6001"
            , manualPCRadius: { "johannesburg": [20] }
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^za$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }

        , "tr": {
            label: "Turkey"
            , searchName: "Turkey"
            , code: "TR"
            , countryList: "tr"
            , locales: ["tr-tr"]
            , distUnit: "km"
            , zipRegex: "^\\d{5}$"
            , sampleZip: "58040"
            , addressPattern: "{SA}, {PC} {CT}, {CY}"
            , countryRestriction: "^tr$"
            , defaultPCRadius: 1.5
            , defaultCityRadius: 10
            , defaultPCRadiusIncrement: 2.5
            , defaultCityRadiusIncrement: 2.5
        }
    }

    , "configurations": {
        "default": {
            country: "en"
            , language: "en"
            , pagerPageSize: 10
            , pagerPagesInNavigation: 5
            , defaultMapZoom: 12
            , showCountryPicker: true
            , assetsBaseFolder: "/_layouts/AlignTech.Invisalign/"
            , langPathSubfolder: ""
            , contactFormUrl: "/_layouts/AlignTech.Invisalign/ContactForm/ContactForm.html?did={did}&name={name}&country={country}&language={language}&it=eu"
            , countryList: ["gb", "ie", "gi"]
            , defaultCountry: "gb"
            , showContactForm: false
            , showProviderBio: true
            , providerBioUrl: "/Profile/Details/{name}/{did}?locale={language}#cid={cid}"
            , providerBioLocale: "gb"
            , hideDistanceSelectorInForm: false
        }

        , "gb_en": {
            hideDistanceSelectorInForm: true
            , combinedCityPostalCode: true
            , showContactForm: true
        }

        , "sc_en": {
            countryList: ["gb"]
            , showCountryPicker: false
        }

        , "ie_en": {
            country: "ie"
            , showCountryPicker: true
            , countryList: ["ie", "ni"]
            , combinedCityPostalCode: true
            , hidePostalCode: false
            , showContactForm: true
        }

        , "de_en": {
            country: "de"
            , language: "en"
            , showCountryPicker: true
            , countryList: ["at", "de", "ch"]
            , defaultCountry: "de"
            , hideLargeAccountLegend: true
            , providerBioLocale: "de"
        }

        , "de_de": {
            country: "de"
            , language: "de"
            , showCountryPicker: true
            , countryList: ["de", "at", "ch", "li"]
            , combinedCityPostalCode: true
            , defaultCountry: "de"
            , langPathSubfolder: "de/"
            , hideLargeAccountLegend: true
            , providerBioLocale: "de"
        }

        , "it_en": {
            country: "it"
            , language: "en"
            , showCountryPicker: true
            , countryList: ["it", "ch", "sm", "mt"]
            , defaultCountry: "it"
            , providerBioLocale: "it"
        }

        , "it_it": {
            country: "it"
            , language: "it"
            , showCountryPicker: true
            , countryList: ["it", "ch", "sm", "mt"]
            , defaultCountry: "it"
            , langPathSubfolder: "it/"
            , providerBioLocale: "it"
        }

        , "es_en": {
            country: "es"
            , language: "en"
            , showCountryPicker: true
            , defaultCountry: "es"
            , countryList: ["es", "ad", "gi"]
            , providerBioLocale: "es"
        }

        , "es_es": {
            country: "es"
            , language: "es"
            , showCountryPicker: true
            , defaultCountry: "es"
            , countryList: ["es", "ad", "gi"]
            , langPathSubfolder: "es/"
            , providerBioLocale: "es"
        }

        , "eu_en": {
            country: "eu"
            , language: "en"
            , showCountryPicker: true
            , countryList: ["ad", "am", "at", "az", "bh", "be", "bg", "hr", "cy", "cz", "ee", "ge", "dk", "fo", "fi", "de", "gi", "gr", "gl", "hu", "is", "ie", "il", "it", "kz", "kw", "kg", "lv", "lb", "li", "lt", "lu", "mt", "md", "mc", "ma", "nl", "no", "pl", "pt", "qa", "ro", "ru", "sm", "sa", "sn", "rs", "sk", "si", "za", "tj", "tn", "tr", "tm", "es", "se", "ch", "ua", "ae", "gb", "uz"]
            , defaultCountry: "gb"
        }

        , "dk_dk": {
            country: "dk"
            , language: "dk"
            , showCountryPicker: true
            , defaultCountry: "dk"
            , combinedCityPostalCode: true
            , countryList: ["dk", "gl"]
            , langPathSubfolder: "dk/"
            , providerBioLocale: "dk"
            , showContactForm: true
        }

        , "se_se": {
            country: "se"
            , language: "se"
            , showCountryPicker: false
            , defaultCountry: "se"
            , countryList: ["se"]
            , langPathSubfolder: "se/"
            , providerBioLocale: "se"
        }

        , "no_no": {
            country: "no"
            , language: "no"
            , showCountryPicker: false
            , defaultCountry: "no"
            , countryList: ["no"]
            , langPathSubfolder: "no/"
            , providerBioLocale: "no"
        }

        , "fi_fi": {
            country: "fi"
            , language: "fi"
            , showCountryPicker: false
            , defaultCountry: "fi"
            , countryList: ["fi"]
            , langPathSubfolder: "fi/"
            , providerBioLocale: "fi"
        }

        , "pt_pt": {
            country: "pt"
            , language: "pt"
            , showCountryPicker: false
            , defaultCountry: "pt"
            , countryList: ["pt"]
            , langPathSubfolder: "pt/"
            , providerBioLocale: "pt"
        }

        , "gr_gr": {
            country: "gr"
            , language: "gr"
            , showCountryPicker: false
            , defaultCountry: "gr"
            , countryList: ["gr"]
            , langPathSubfolder: "gr/"
            , providerBioLocale: "gr"
        }

        , "is_is": {
            country: "is"
            , language: "is"
            , showCountryPicker: false
            , defaultCountry: "is"
            , countryList: ["is"]
            , langPathSubfolder: "is/"
            , providerBioLocale: "is"
        }

        , "pl_pl": {
            country: "pl"
            , language: "pl"
            , showCountryPicker: false
            , defaultCountry: "pl"
            , countryList: ["pl"]
            , langPathSubfolder: "pl/"
            , providerBioLocale: "pl"
        }

        , "cz_cz": {
            country: "cz"
            , language: "cz"
            , showCountryPicker: false
            , defaultCountry: "cz"
            , countryList: ["cz"]
            , langPathSubfolder: "cz/"
            , providerBioLocale: "cz"
            , showContactForm: true
        }

        , "sk_sk": {
            country: "sk"
            , language: "sk"
            , showCountryPicker: false
            , defaultCountry: "sk"
            , countryList: ["sk"]
            , langPathSubfolder: "sk/"
            , providerBioLocale: "sk"
            , showContactForm: true
        }

        , "ro_ro": {
            country: "ro"
            , language: "ro"
            , showCountryPicker: false
            , defaultCountry: "ro"
            , countryList: ["ro"]
            , langPathSubfolder: "ro/"
            , providerBioLocale: "ro"
        }

        , "hu_hu": {
            country: "hu"
            , language: "hu"
            , showCountryPicker: false
            , defaultCountry: "hu"
            , countryList: ["hu"]
            , langPathSubfolder: "hu/"
            , providerBioLocale: "hu"
        }

        , "nl_nl": {
            country: "nl"
            , language: "nl"
            , showCountryPicker: true
            , defaultCountry: "nl"
            , combinedCityPostalCode: true
            , countryList: ["nl", "be"]
            , langPathSubfolder: "nl/"
            , providerBioLocale: "nl"
            , showContactForm: true
        }

        , "be_nl": {
            country: "be"
            , language: "nl"
            , showCountryPicker: true
            , defaultCountry: "be"
            , countryList: ["be", "nl"]
            , langPathSubfolder: "nl/"
            , providerBioLocale: "nl"
        }

        , "be_fr": {
            country: "be"
            , language: "fr"
            , showCountryPicker: true
            , defaultCountry: "be"
            , countryList: ["be", "lu"]
            , langPathSubfolder: "fr/"
            , providerBioLocale: "fr"
        }

        , "lu_de": {
            country: "lu"
            , language: "de"
            , showCountryPicker: false
            , defaultCountry: "lu"
            , countryList: ["lu"]
            , langPathSubfolder: "de/"
            , providerBioLocale: "de"
        }

        , "lu_fr": {
            country: "lu"
            , language: "fr"
            , showCountryPicker: true
            , defaultCountry: "lu"
            , countryList: ["lu", "be"]
            , langPathSubfolder: "fr/"
            , providerBioLocale: "fr"
        }

        , "ch_fr": {
            country: "ch"
            , language: "fr"
            , showCountryPicker: false
            , defaultCountry: "ch"
            , countryList: ["ch"]
            , langPathSubfolder: "fr/"
            , providerBioLocale: "fr"
        }

        , "bg_bg": {
            country: "bg"
            , language: "bg"
            , showCountryPicker: false
            , defaultCountry: "bg"
            , countryList: ["bg"]
            , langPathSubfolder: "bg/"
            , providerBioLocale: "bg"
        }

        , "hr_hr": {
            country: "hr"
            , language: "hr"
            , showCountryPicker: false
            , defaultCountry: "hr"
            , countryList: ["hr"]
            , langPathSubfolder: "hr/"
            , providerBioLocale: "hr"
        }

        , "si_si": {
            country: "si"
            , language: "si"
            , showCountryPicker: false
            , defaultCountry: "si"
            , countryList: ["si"]
            , langPathSubfolder: "si/"
            , providerBioLocale: "si"
        }

        , "ru_ru": {
            country: "ru"
            , language: "ru"
            , showCountryPicker: true
            , defaultCountry: "ru"
            , countryList: ["ru", "am", "az", "ge", "kg", "md", "tj", "tm", "uz"]
            , langPathSubfolder: "si/"
            , providerBioLocale: "si"
            , hideAnnotations: true
        }

        , "ee_et": {
            country: "ee"
            , language: "et"
            , showCountryPicker: false
            , defaultCountry: "ee"
            , countryList: ["ee"]
            , langPathSubfolder: "ee/"
            , providerBioLocale: "ee"
        }

        , "lv_lv": {
            country: "lv"
            , language: "lv"
            , showCountryPicker: false
            , defaultCountry: "lv"
            , countryList: ["lv"]
            , langPathSubfolder: "lv/"
            , providerBioLocale: "lv"
        }

        , "lt_lt": {
            country: "lt"
            , language: "lt"
            , showCountryPicker: false
            , defaultCountry: "lt"
            , countryList: ["lt"]
            , langPathSubfolder: "lt/"
            , providerBioLocale: "lt"
        }

        , "ua_uk": {
            country: "ua"
            , language: "uk"
            , showCountryPicker: false
            , defaultCountry: "ua"
            , countryList: ["ua"]
            , langPathSubfolder: "ua/"
            , providerBioLocale: "ua"
        }

        , "kz_ru": {
            country: "kz"
            , language: "ru"
            , showCountryPicker: false
            , defaultCountry: "kz"
            , countryList: ["kz"]
            , langPathSubfolder: "kz/"
            , providerBioLocale: "kz"
        }

        , "sa_en": {
            country: "sa"
            , language: "en"
            , showCountryPicker: false
            , defaultCountry: "sa"
            , countryList: ["sa"]
            , langPathSubfolder: ""
            , providerBioLocale: "gb"
            , showContactForm: true
            , fixedCityItems: { "KSAR1": "Central Region", "KSAR2": "Western Region", "KSAR3": "Eastern Region" }
        }

        , "sa_ar": {
            country: "sa"
            , language: "ar"
            , showCountryPicker: false
            , defaultCountry: "sa"
            , countryList: ["sa"]
            , langPathSubfolder: "ar/"
            , providerBioLocale: "ar"
            , showContactForm: true
            , fixedCityItems: { "KSAR1": "المنطقة الوسطى", "KSAR2": "المنطقة الغربية", "KSAR3": "المنطقة الشرقية" }
        }

        , "bh_en": {
            country: "bh"
            , language: "en"
            , showCountryPicker: false
            , defaultCountry: "bh"
            , countryList: ["bh"]
            , langPathSubfolder: ""
            , providerBioLocale: "gb"
        }

        , "bh_ar": {
            country: "bh"
            , language: "ar"
            , showCountryPicker: false
            , defaultCountry: "bh"
            , countryList: ["bh"]
            , langPathSubfolder: "ar/"
            , providerBioLocale: "ar"
        }

        , "qa_en": {
            country: "qa"
            , language: "en"
            , showCountryPicker: false
            , defaultCountry: "qa"
            , countryList: ["qa"]
            , langPathSubfolder: ""
            , providerBioLocale: "gb"
        }

        , "qa_ar": {
            country: "qa"
            , language: "ar"
            , showCountryPicker: false
            , defaultCountry: "qa"
            , countryList: ["qa"]
            , langPathSubfolder: "ar/"
            , providerBioLocale: "ar"
        }

        , "kw_en": {
            country: "kw"
            , language: "en"
            , showCountryPicker: false
            , defaultCountry: "kw"
            , countryList: ["kw"]
            , langPathSubfolder: ""
            , providerBioLocale: "gb"
        }

        , "kw_ar": {
            country: "kw"
            , language: "ar"
            , showCountryPicker: false
            , defaultCountry: "kw"
            , countryList: ["kw"]
            , langPathSubfolder: "ar/"
            , providerBioLocale: "ar"
        }

        , "ae_en": {
            country: "ae"
            , language: "en"
            , showCountryPicker: false
            , defaultCountry: "ae"
            , countryList: ["ae"]
            , langPathSubfolder: ""
            , providerBioLocale: "gb"
        }

        , "ae_ar": {
            country: "ae"
            , language: "ar"
            , showCountryPicker: false
            , defaultCountry: "ae"
            , countryList: ["ae"]
            , langPathSubfolder: "ar/"
            , providerBioLocale: "ar"
        }

        , "lb_fr": {
            country: "lb"
            , language: "fr"
            , showCountryPicker: false
            , defaultCountry: "lb"
            , countryList: ["lb"]
            , langPathSubfolder: "fr/"
            , providerBioLocale: "fr"
        }

        , "lb_ar": {
            country: "lb"
            , language: "ar"
            , showCountryPicker: false
            , defaultCountry: "lb"
            , countryList: ["lb"]
            , langPathSubfolder: "ar/"
            , providerBioLocale: "ar"
        }

        , "il_en": {
            country: "il"
            , language: "en"
            , showCountryPicker: false
            , defaultCountry: "il"
            , countryList: ["il"]
            , langPathSubfolder: ""
            , providerBioLocale: "gb"
        }

        , "il_he": {
            country: "il"
            , language: "he"
            , showCountryPicker: false
            , defaultCountry: "il"
            , countryList: ["il"]
            , langPathSubfolder: "he/"
            , providerBioLocale: "he"
        }

         , "tr_tr": {
             country: "tr"
            , language: "tr"
            , showCountryPicker: false
            , defaultCountry: "tr"
            , countryList: ["tr"]
            , langPathSubfolder: "tr/"
            , providerBioLocale: "tr"
         }

        , "mc_fr": {
            country: "mc"
            , language: "fr"
            , showCountryPicker: false
            , defaultCountry: "mc"
            , countryList: ["mc"]
            , langPathSubfolder: "fr/"
            , providerBioLocale: "fr"
        }

        , "ma_fr": {
            country: "ma"
            , language: "fr"
            , showCountryPicker: true
            , defaultCountry: "ma"
            , countryList: ["ma", "tn", "sn"]
            , langPathSubfolder: "fr/"
            , providerBioLocale: "fr"
        }

        , "ma_ar": {
            country: "ma"
            , language: "ar"
            , showCountryPicker: true
            , defaultCountry: "ma"
            , countryList: ["ma", "tn", "sn"]
            , langPathSubfolder: "ar/"
            , providerBioLocale: "ar"
        }

        , "za_en": {
            country: "za"
            , language: "en"
            , showCountryPicker: false
            , defaultCountry: "za"
            , countryList: ["za"]
            , langPathSubfolder: ""
            , providerBioLocale: "gb"
        }

        , "cy_en": {
            country: "cy"
            , language: "en"
            , showCountryPicker: false
            , defaultCountry: "cy"
            , countryList: ["cy"]
            , langPathSubfolder: ""
            , providerBioLocale: "gb"
        }

        , "cy_gr": {
            country: "cy"
            , language: "gr"
            , showCountryPicker: false
            , defaultCountry: "cy"
            , countryList: ["cy"]
            , langPathSubfolder: "gr/"
            , providerBioLocale: "gr"
        }
    }
    , defaultConfiguration: "gb_en"
}