const { div$ } = include('src/libs/fakeReact/FakeReact.js');

const Padding = (...children) =>
  div$(...children).setStyle({ padding: '10px' });

module.exports = Padding;
