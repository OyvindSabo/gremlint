const { div$ } = include('src/libraries/fakeReact/FakeReact.js');

const CenteredContainer = (...chilren) =>
  div$(...chilren).setStyle({
    margin: 'auto',
    maxWidth: '720px',
  });

module.exports = CenteredContainer;
