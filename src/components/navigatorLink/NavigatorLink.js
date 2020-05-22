const { a$ } = include('src/libs/fakeReact/FakeReact.js');

const NavigatorLink = ({ title, to }) =>
  a$(title)
    .setProps({ href: `#!${to}` })
    .setStyle({ marginRight: '20px' });

module.exports = NavigatorLink;
