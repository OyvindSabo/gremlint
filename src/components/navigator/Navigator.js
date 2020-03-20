const { div$ } = include('src/libraries/fakeReact/FakeReact.js');

const Navigator = (...children) =>
  div$(...children).setStyle({ padding: '10px 0', marginBottom: '20px' });

module.exports = Navigator;
