const { div$ } = include('src/libraries/fakeReact/FakeReact.js');

const Padding = (...children) =>
  div$(...children).setStyle({ padding: '10px' });

module.exports = Padding;
