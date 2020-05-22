const { div$ } = include('src/libs/fakeReact/FakeReact.js');

const CenteredContainer = (...chilren) =>
  div$(...chilren).setStyle({
    margin: 'auto',
    maxWidth: '720px',
  });

module.exports = CenteredContainer;
