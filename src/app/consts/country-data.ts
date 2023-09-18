import { MaskitoOptions } from '@maskito/core';

export const defaultCountryData: CountryData = {
  regExp: /.+/,
  hint: '',
  tag: '',
  mask: {
    mask: /.+/,
  },
  name: '',
};

export const COUNTRIES: Record<string, CountryData> = {
  Польша: {
    name: 'Польша',
    tag: 'PL',
    regExp: /^\d{2}-\d{3}$/,
    hint: '12-345',
    mask: {
      mask: [/\d/, /\d/, '-', /\d/, /\d/, /\d/],
    },
  },
  США: {
    name: 'США',
    tag: 'US',
    regExp: /^\d{5}(-\d{4})?$/,
    hint: '12345-6789',
    mask: {
      mask: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    },
  },
  Канада: {
    name: 'Канада',
    tag: 'CA',
    regExp: /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
    hint: 'K1A 0B1',
    mask: {
      mask: [/[A-Za-z]/, /\d/, /[A-Za-z]/, ' ', /\d/, /[A-Za-z]/, /\d/],
    },
  },
  Беларусь: {
    name: 'Беларусь',
    tag: 'BY',
    regExp: /^\d{6}$/,
    hint: '220000',
    mask: {
      mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
    },
  },
  Украина: {
    name: 'Украина',
    tag: 'UA',
    regExp: /^\d{5}$/,
    hint: '12345',
    mask: {
      mask: [/\d/, /\d/, /\d/, /\d/, /\d/],
    },
  },
};

export interface CountryData {
  name: string;
  tag: string;
  regExp: RegExp;
  hint: string;
  mask: MaskitoOptions;
}
