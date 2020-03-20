const { a$ } = include('src/libraries/fakeReact/FakeReact.js');

const NavigatorLink = ({ title, to }) =>
  a$(title)
    .setProps({ href: `#!${to}` })
    .setStyle({ marginRight: '20px' });

module.exports = NavigatorLink;
