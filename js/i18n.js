const lngs = {
  en: { nativeName: 'English' },
  de: { nativeName: 'Deutsch' }
};

const rerender = () => {
  // start localizing, details:
  // https://github.com/i18next/jquery-i18next#usage-of-selector-function
  $('body').localize();

  $('title').text($.t('head.title'))
  $('meta[name=description]').attr('content', $.t('head.description'))
}

$(function () {
  // use plugins and options as needed, for options, detail see
  // https://www.i18next.com
  i18next
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(i18nextBrowserLanguageDetector)
    .use(i18nextHttpBackend)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      debug: true,
      fallbackLng: 'en',
      supportedLngs: ['en', 'de'],
      nonExplicitSupportedLngs: true,
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json'
      }
      // resources: {
      //   en: {
      //     translation: {
      //       head: {
      //         title: 'My Awesome Landing-Page',
      //         description: 'The description of this awesome landing page.'
      //       },
      //       intro: {
      //         title: 'Landing Page',
      //         subTitle: 'Some subtitle'
      //       },
      //       footer: {
      //         counter_one: 'Changed language just once',
      //         counter_other: 'Changed language already {{count}} times',
      //         date: 'It\'s {{date, LLLL}}'
      //       }
      //     }
      //   },
      //   de: {
      //     translation: {
      //       head: {
      //         title: 'Meine grossartige Webseite',
      //         description: 'Die Beschreibung dieser grossartigen Webseite.'
      //       },
      //       intro: {
      //         title: 'Webseite',
      //         subTitle: 'Ein Untertitel'
      //       },
      //       footer: {
      //         counter_one: 'Die Sprache wurde erst ein mal gewechselt',
      //         counter_other: 'Die Sprache wurde {{count}} mal gewechselt',
      //         date: 'Es ist {{date, LLLL}}'
      //       }
      //     }
      //   }
      // }
    }, (err, t) => {
      if (err) return console.error(err);

      // define the formatter function
      // i18next.services.formatter.add('LLLL', (value, lng, options) => {
      //   return moment(value).locale(lng).format('LLLL');
      // });

      // for options see
      // https://github.com/i18next/jquery-i18next#initialize-the-plugin
      jqueryI18next.init(i18next, $, { useOptionsAttr: true });

      // fill language switcher
      // Object.keys(lngs).map((lng) => {
      //   const opt = new Option(lngs[lng].nativeName, lng);
      //   if (lng === i  ) {
      //     opt.setAttribute("selected", "selected");
      //   }
      //   $('#languageSwitcher').append(opt);
      // });
      // let languageChangedCounter = 0;

      // $('#languageSwitcher').change((a, b, c) => {
      //   const chosenLng = $(this).find("option:selected").attr('value');
      //   i18next.changeLanguage(chosenLng, () => {
      //     rerender();

      //     // language changed message
      //     languageChangedCounter++;
      //     $('#languageChangedNotification').localize({ count: languageChangedCounter })
      //     if (languageChangedCounter === 1) {
      //       $('#languageChangedNotification').show();
      //     }
      //   });
      // });

      // Handle language switch on click
      var languageSwitch = $('#languageSwitch');
      languageSwitch.on('click', function () {
        // Determine the current language
        var currentLanguage = i18next.resolvedLanguage.split('-')[0];

        // Toggle between English (en) and German (de)
        var newLanguage = currentLanguage === 'en' ? 'de' : 'en';

        console.log(currentLanguage, newLanguage, languageSwitch.val())
        // Update the language switcher
        i18next.changeLanguage(newLanguage, () => {
          languageSwitch.text(currentLanguage)

          rerender();
        });
      });

      rerender();
    });
});