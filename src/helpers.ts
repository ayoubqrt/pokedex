export const castAsSingle = <T>(value: T | T[]) =>
  Array.isArray(value) ? value[0] : value;
