import {load} from 'cheerio';

export const toDom = (js: string) => load(js, undefined, true);
