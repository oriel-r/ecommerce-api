import regex from './regex';

type RegexKeys = keyof typeof regex;

export const valueChecker = (body: Record<string, string | number>) => {
  for (const key in body) {
    const value = body[key].toString();
    const isValid = regex[key as RegexKeys]?.test(value);

    if (!isValid) {
      return { isValid: false, key };
    }
  }
  return { isValid: true };
};
