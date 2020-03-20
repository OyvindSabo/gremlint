const { div$ } = include('src/libraries/fakeReact/FakeReact.js');

const CenteredContainer = (...chilren) =>
  div$(...chilren).setStyle({ margin: 'auto', width: '720px' });

module.exports = CenteredContainer;
