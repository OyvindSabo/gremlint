const { compose } = include('src/libs/simpleHTML/SimpleHTML.js');

const Spacer = () => compose('div', { style: 'height: 20px' }, []);

module.exports = Spacer;
