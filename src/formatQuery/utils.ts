export const last = <T>(array: T[]): T | undefined => array.slice(-1)[0];

export const pipe = (...fns: ((value: any) => any)[]) => (value: any) => fns.reduce((value, fn) => fn(value), value);

export const spaces = (numberOfSpaces: number): string => Array(numberOfSpaces + 1).join(' ');

export const eq = (a: unknown) => (b: unknown): boolean => a === b;

export const neq = (a: unknown) => (b: unknown): boolean => a !== b;

export const sum = (a: number, b: number): number => a + b;

export const count = (array: any): number => array?.length ?? 0;
