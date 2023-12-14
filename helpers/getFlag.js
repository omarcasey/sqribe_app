// helpers.js
import { languageOptions } from "./languages";

export const getFlagCode = (label) => {
  // Find the language object based on label or value
  const languageObject = languageOptions.find(
    (option) => option.label === label
  );

  // Return the flag code if found, otherwise null
  return languageObject ? languageObject.flagCode : null;
};

export const getTranslateCode = (label) => {
  // Find the language object based on label or value
  const languageObject = languageOptions.find(
    (option) => option.label === label
  );

  // Return the translate code if found, otherwise null
  return languageObject ? languageObject.translateCode : null;
};
