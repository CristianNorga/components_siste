import { TextsBase } from './models/config-by-lang-model.js';

export const loadTextsToLocalStorage = (texts: Array<TextsBase>) => {

  texts.forEach(element => {
    localStorage.setItem(element.label, element.value);
  });
  
};