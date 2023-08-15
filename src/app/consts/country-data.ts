import { MaskitoOptions } from '@maskito/core';

export const COUNTRIES: Record<string, CountryData> = {
  Poland: {
    name: 'Poland',
    regExp: /^\d{2}-\d{3}$/,
    hint: '12-345',
    mask: {
      mask: [/\d/, /\d/, '-', /\d/, /\d/, /\d/],
    },
  },
};

export interface CountryData {
  name: string;
  regExp: RegExp;
  hint: string;
  mask: MaskitoOptions;
}

export const defaultCountryData: CountryData = {
  regExp: /.+/,
  hint: '',
  mask: {
    mask: /.+/,
  },
  name: '',
};
