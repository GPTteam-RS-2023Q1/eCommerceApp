import { MaskitoOptions } from '@maskito/core';

export const defaultCountryData: CountryData = {
  regExp: /.+/,
  hint: '',
  mask: {
    mask: /.+/,
  },
  name: '',
};

export const COUNTRIES: Record<string, CountryData> = {
  Poland: {
    name: 'Poland',
    regExp: /^\d{2}-\d{3}$/,
    hint: '12-345',
    mask: {
      mask: [/\d/, /\d/, '-', /\d/, /\d/, /\d/],
    },
  },
  USA: {
    name: 'USA',
    regExp: /^\d{5}(-\d{4})?$/,
    hint: '12345-6789',
    mask: {
      mask: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    },
  },
  Canada: {
    name: 'Canada',
    regExp: /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
    hint: 'K1A 0B1',
    mask: {
      mask: [/[A-Za-z]/, /\d/, /[A-Za-z]/, ' ', /\d/, /[A-Za-z]/, /\d/],
    },
  },
  Belarus: {
    name: 'Belarus',
    regExp: /^\d{6}$/,
    hint: '220000',
    mask: {
      mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
    },
  },
  Ukraine: {
    name: 'Ukraine',
    regExp: /^\d{5}$/,
    hint: '12345',
    mask: {
      mask: [/\d/, /\d/, /\d/, /\d/, /\d/],
    },
  },
};

export interface CountryData {
  name: string;
  regExp: RegExp;
  hint: string;
  mask: MaskitoOptions;
}
