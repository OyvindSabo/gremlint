export const last = <T>(array: T[]) => array.slice(-1)[0];

export const pipe = (...fns: ((value: any) => any)[]) => (value: any) => fns.reduce((value, fn) => fn(value), value);

export const spaces = (numberOfSpaces: number): string => Array(numberOfSpaces + 1).join(' ');
