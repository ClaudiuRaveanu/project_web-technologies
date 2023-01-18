import { MuiTelInputCountry } from '../constants/countries';
export declare type MuiTelInputContinent = 'EU' | 'AS' | 'NA' | 'SA' | 'OC' | 'AF';
declare type Continents = {
    [key in MuiTelInputContinent]: MuiTelInputCountry[];
};
export declare const CONTINENTS: Continents;
export {};
