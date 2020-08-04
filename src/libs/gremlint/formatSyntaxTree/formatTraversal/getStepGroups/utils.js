const isTraversalSource = (step) => step.type === 'word' && step.word === 'g';

const isModulator = (step) =>
  step.type === 'method' &&
  step.method.type === 'word' &&
  [
    'by',
    'as',
    'as_',
    'option',
    'from',
    'from_',
    'to',
    'read',
    'with_',
    'write',
  ].includes(step.method.word);

module.exports = { isTraversalSource, isModulator };
