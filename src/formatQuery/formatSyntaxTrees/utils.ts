import { GremlintConfig } from '../types';

const withIndentation = (indentation: number) => (config: GremlintConfig): GremlintConfig => ({
  ...config,
  indentation,
});

export const withZeroIndentation = withIndentation(0);

export const withIncreasedIndentation = (indentationIncrease: number) => (config: GremlintConfig): GremlintConfig => ({
  ...config,
  indentation: config.indentation + indentationIncrease,
});

export const withDotInfo = ({
  shouldStartWithDot,
  shouldEndWithDot,
}: {
  shouldStartWithDot: boolean;
  shouldEndWithDot: boolean;
}) => (config: GremlintConfig): GremlintConfig => ({
  ...config,
  shouldStartWithDot,
  shouldEndWithDot,
});

export const withZeroDotInfo = (config: GremlintConfig): GremlintConfig => ({
  ...config,
  shouldStartWithDot: false,
  shouldEndWithDot: false,
});

export const withNoEndDotInfo = (config: GremlintConfig): GremlintConfig => ({
  ...config,
  shouldEndWithDot: false,
});

export const withHorizontalPosition = (horizontalPosition: number) => (config: GremlintConfig): GremlintConfig => ({
  ...config,
  horizontalPosition,
});

export const withIncreasedHorizontalPosition = (horizontalPositionIncrease: number) => (
  config: GremlintConfig,
): GremlintConfig => ({
  ...config,
  horizontalPosition: config.horizontalPosition + horizontalPositionIncrease,
});
