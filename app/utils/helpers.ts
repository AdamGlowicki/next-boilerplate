import { FeatureNames } from '@/core/interfaces/store';

export const isBrowser = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

export const getActionPrefix = (featureName: FeatureNames) => featureName.toUpperCase();

export const isLocaleRTL = (locale: string | undefined) => {
  if (!locale) {
    return false;
  }

  return [
    'ar',
    'arc',
    'dv',
    'fa',
    'ha',
    'he',
    'khw',
    'ks',
    'ku',
    'ps',
    'ur',
    'yi',
  ].includes(locale.split('-')[0]);
};

export const importLocaleMessages = async (locale: string | undefined) => {
  if (!locale) {
    return false;
  }

  try {
    return (await import(`@/lang/compiled/${locale}.json`)).default;
  } catch (e) {
    return undefined;
  }
};
