import { DotInfo, ExtendedGremlintConfig, GremlintConfig } from '../types';

export const withIndentation = (indentation: number) => (config: GremlintConfig): GremlintConfig => ({
  ...config,
  indentation,
});

export const withZeroIndentation = withIndentation(0);

export const withIncreasedIndentation = (indentationIncrease: number) => (config: GremlintConfig): GremlintConfig => ({
  ...config,
  indentation: config.indentation + indentationIncrease,
});

export const withDotInfo = ({ shouldStartWithDot, shouldEndWithDot }: DotInfo) => (
  config: GremlintConfig,
): ExtendedGremlintConfig => ({
  ...config,
  shouldStartWithDot,
  shouldEndWithDot,
});

export const withZeroDotInfo = (config: GremlintConfig): ExtendedGremlintConfig => ({
  ...config,
  shouldStartWithDot: false,
  shouldEndWithDot: false,
});

export const withNoEndDotInfo = (config: GremlintConfig): ExtendedGremlintConfig => ({
  ...config,
  shouldEndWithDot: false,
});
