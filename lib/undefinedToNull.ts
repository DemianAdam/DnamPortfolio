type UndefinedToNullStrict<T> = {
  [K in keyof T]-?:
    undefined extends T[K]
      ? Exclude<T[K], undefined> | null
      : T[K];
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export function undefinedToNull<T extends Record<string, any>>(
  obj: T
): UndefinedToNullStrict<T> {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const result: any = {};

  for (const key in obj) {
    const value = obj[key];
    result[key] = value === undefined ? null : value;
  }

  return result;
}