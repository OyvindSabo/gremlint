const isTraversalSource = (step) => step.type === 'word' && step.word === 'g';

const isModulator = (step) =>
  step.type === 'method' &&
  step.method.type === 'word' &&
  [
    'as',
    'as_',
    'by',
    'emit',
    'option',
    'from',
    'from_',
    'to',
    'read',
    'times',
    'until',
    'with',
    'with_',
    'write',
  ].includes(step.method.word);

module.exports = { isTraversalSource, isModulator };
