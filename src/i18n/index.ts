import i18next from 'i18next';

import defaultTranslations from './messages.json';

i18next.init({
    debug: true,

    resources: {
        dev: {
            worlds: defaultTranslations,
        },
    },

    ns: ['worlds'],
    defaultNS: 'worlds',
    nsSeparator: false,

    interpolation: {
        escapeValue: false,
    },

    parseMissingKeyHandler: key => `!!${key}!!`,
});

export default i18next;
