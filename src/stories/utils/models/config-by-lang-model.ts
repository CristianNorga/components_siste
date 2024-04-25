interface ResponseSchema {
  country: string;
  message: string;
  errorCode: number;
  function: string;
}
export interface TextsBase {
  label: string;
  type: string;
  value: string;
}

export interface DataConfigByLang {
  lang: string;
  locale: string;
  currency: string;
  deviceType: string;
  text: Array<TextsBase>
  questions: Array<string>;
  frequencies: [Frequency];
  documentTypes: [typesDocument];
}

export interface ConfigByLang extends ResponseSchema {
  data: DataConfigByLang;
}

export interface DataConfigBase {
  country: string;
  lang: string;
  deviceType: string;
  textBase: [TextsBase];
  domains: [string];
}

export interface ConfigBase extends ResponseSchema {
  data: [ DataConfigBase ];
}

export interface Frequency {
    name: string;
    code: number;
}
export interface typesDocument {
    name: string;
    code: string;
}
