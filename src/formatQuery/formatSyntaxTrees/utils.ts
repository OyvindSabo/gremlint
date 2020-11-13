import { GremlintInternalConfig } from '../types';

const withIndentation = (localIndentation: number) => (config: GremlintInternalConfig): GremlintInternalConfig => ({
  ...config,
  localIndentation,
});

export const withZeroIndentation = withIndentation(0);

export const withIncreasedIndentation = (indentationIncrease: number) => (
  config: GremlintInternalConfig,
): GremlintInternalConfig => ({
  ...config,
  localIndentation: config.localIndentation + indentationIncrease,
});

export const withDotInfo = ({
  shouldStartWithDot,
  shouldEndWithDot,
}: {
  shouldStartWithDot: boolean;
  shouldEndWithDot: boolean;
}) => (config: GremlintInternalConfig): GremlintInternalConfig => ({
  ...config,
  shouldStartWithDot,
  shouldEndWithDot,
});

export const withZeroDotInfo = (config: GremlintInternalConfig): GremlintInternalConfig => ({
  ...config,
  shouldStartWithDot: false,
  shouldEndWithDot: false,
});

export const withNoEndDotInfo = (config: GremlintInternalConfig): GremlintInternalConfig => ({
  ...config,
  shouldEndWithDot: false,
});

export const withHorizontalPosition = (horizontalPosition: number) => (
  config: GremlintInternalConfig,
): GremlintInternalConfig => ({
  ...config,
  horizontalPosition,
});

export const withIncreasedHorizontalPosition = (horizontalPositionIncrease: number) => (
  config: GremlintInternalConfig,
): GremlintInternalConfig => ({
  ...config,
  horizontalPosition: config.horizontalPosition + horizontalPositionIncrease,
});
