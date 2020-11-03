import { FormattedSyntaxTree, TokenType, UnformattedSyntaxTree } from '../../../types';
import { STEP_MODULATORS } from '../../../consts';

export const isTraversalSource = (step: FormattedSyntaxTree): boolean => {
  return step.type === TokenType.Word && step.word === 'g';
};

export const isModulator = (step: UnformattedSyntaxTree | FormattedSyntaxTree): boolean => {
  if (step.type !== TokenType.Method) return false;
  if (step.method.type !== TokenType.Word) return false;
  return STEP_MODULATORS.includes(step.method.word);
};
