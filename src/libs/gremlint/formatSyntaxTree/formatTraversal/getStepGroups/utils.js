const isTraversalSource = (step) => step.type === 'word' && step.word === 'g';

const isModulator = (step) =>
  step.type === 'method' &&
  step.method.type === 'word' &&
  ['by', 'as', 'option', 'from', 'to', 'read', 'write'].includes(
    step.method.word
  );

module.exports = { isTraversalSource, isModulator };
